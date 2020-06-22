import React, { Component } from "react";
import BookService from "../../services/BookService";
import { withStyles } from "@material-ui/core/styles";
import Filters from "./Filters";
import { Paper } from "@material-ui/core";
import BooksTable from "./booksTable";

const useStyles = (theme) => ({
    tableView: {
        textAlign: "center"
    },
    error: {
        color: "red"
    },
    paper: {
        marginTop: theme.spacing(2)
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
                <Filters/>
                {!!this.state.error && <div className={classes.error}> {this.state.error} </div>}

                {this.state.data.map((book) => (
                    <h3 key={book._id}>{book.title}</h3>
                ))}

                {/*<BooksTable/>*/}

            </div>
        );
    } 
}

export default withStyles(useStyles)(TableView);
