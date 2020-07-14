import React, { Component } from "react";
import BookshelfService from "../../services/BookshelfService";
import BrowseBooksTable from "../../components/booklist/browseBooksTable";
import UserService from "../../services/UserService";

class BookshelfView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            bookshelf: null,
            loading: false,
            books: [],
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
            this.setState({
                user: user,
                loading: false,
                bookshelf: bookshelf,
                books: [...books],
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
            <div>
                <BrowseBooksTable
                    tablename={!!this.state.bookshelf && this.state.bookshelf.name}
                    data={this.state.books}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default BookshelfView;
