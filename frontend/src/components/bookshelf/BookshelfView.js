import React, { Component } from "react";
import BookshelfService from "../../services/BookshelfService";
import BrowseBooksTableBookshelf from "../../components/booklist/browseBooksTableBookshelf";
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
            recommendedBooks: [],
            frequentTags: []
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
            const recommendedBooks = await BookshelfService.getRecommendationsForBookshelf(bookshelf._id);
            console.log(recommendedBooks.frequentTags)
            this.setState({
                user: user,
                loading: false,
                bookshelf: bookshelf,
                books: [...books],
                recommendedBooks: [...recommendedBooks.finalBooks],
                frequentTags: [...recommendedBooks.frequentTags]
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
                <BrowseBooksTableBookshelf
                    tablename={!!this.state.bookshelf && this.state.bookshelf.name}
                    description={!!this.state.bookshelf && this.state.bookshelf.description}
                    data={this.state.books}
                    loading={this.state.loading}
                    bookshelf={!!this.state.bookshelf && this.state.bookshelf._id}
                />
                <RecommendationList books={!!this.state.recommendedBooks && this.state.recommendedBooks}
                    tags={!!this.state.frequentTags && this.state.frequentTags}/>
            </>
        );
    }
}

export default BookshelfView;
