import React, { Component } from "react";
import BookService from "../../services/BookService";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    tableView: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    error: {
        color: "red"
    }
});

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const books = await BookService.getAllBooks();
            this.setState({
                data: [...books],
                loading: false,
            });
        } catch (error) {
            //error.message
            this.setState({
                error: error,
            });
        }

        /* BookService.getAllBooks()
            .then((data) => {
                this.setState({
                    data: [...data],
                    loading: false,
                    //error: "fuck"
                });
            })
            .catch((e) => {
                console.error(e);
            });*/
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.tableView}>
                <h1>Books table</h1>
                {!!this.state.error && <div className={classes.error}> {this.state.error} </div>}
                {this.state.data.map((book) => (
                    <h2 key={book._id}>{book.title}</h2>
                ))}
            </div>
        );
    }
}

export default withStyles(useStyles)(TableView);
