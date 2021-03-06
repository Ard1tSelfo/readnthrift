import React, { Component } from "react";
import BookService from "../../services/BookService";
import { withStyles } from "@material-ui/core/styles";
import BrowseBooksTable from "./browseBooksTable";
import UserService from "../../services/UserService";

const useStyles = (theme) => ({
    tableView: {
        textAlign: "center",
    },
    error: {
        color: "red",
    },
    paper: {
        marginBottom: theme.spacing(2),
    },
});

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            user: null,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const books = await BookService.getAllBooks();
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
                data: [...books],
                loading: false,
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.tableView}>
                {!!this.state.error && <div className={classes.error}> {this.state.error} </div>}
                <BrowseBooksTable data={this.state.data} loading={this.state.loading}/>
            </div>
        );
    }
}

export default withStyles(useStyles)(TableView);
