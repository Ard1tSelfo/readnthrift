import React, { Component } from "react";
import BookshelfService from "../../services/BookshelfService";

class BookshelfView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookshelf: null,
            loading: false,
            books: [] 
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const bookshelf = await BookshelfService.getBookshelfById(this.match.params.bookshelfid)
            //TODO create service getBooksByIdList
            this.setState({
                user: user,
                loading: false,
                bookshelf: bookshelf
                //books: books 
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        return (
            <BrowseBooksTable data={this.state.data} loading={this.state.loading}/>
        );
    }
}

export default BookshelfView;
