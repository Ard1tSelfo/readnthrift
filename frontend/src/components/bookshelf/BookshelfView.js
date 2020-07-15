import React, { Component } from "react";
import BookshelfService from "../../services/BookshelfService";
import BrowseBooksTable from "../../components/booklist/browseBooksTable";
import UserService from "../../services/UserService";
import RecommendationList from "../../components/recommendation/RecommendationList";

class BookshelfView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            bookshelf: null,
            loading: false,
            books: [],
            recommendedBooks: []
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const user = await UserService.getCurrentUser();
            const bookshelf = await BookshelfService.getBookshelfById(
                this.props.match.params.bookshelfid
            );
            const books = await BookshelfService.getBooksByBookshelfId(bookshelf._id);
            console.log(books)
            const recommendedBooks = await BookshelfService.getRecommendationsForBookshelf(bookshelf._id);
            console.log(recommendedBooks)
            this.setState({
                user: user,
                loading: false,
                bookshelf: bookshelf,
                books: [...books],
                recommendedBooks: recommendedBooks
            });
        } catch (error) {
            console.log(error);
            this.setState({
                error: error,
            });
        }
    }

    render() {
        return (
            <>
                <BrowseBooksTable
                    tablename={!!this.state.bookshelf && this.state.bookshelf.name}
                    data={this.state.books}
                    loading={this.state.loading}
                />
                <RecommendationList books={!!this.state.recommendedBooks && this.state.recommendedBooks}/>
            </>
        );
    }
}

export default BookshelfView;
