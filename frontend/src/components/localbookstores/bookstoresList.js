import React, { Component } from "react";
import BookstoreService from "../../services/BookstoreService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StoreIcon from '@material-ui/icons/Store';
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
})

class BookstoresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookstores: [],
        };
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }


    handleListItemClick = (event, bookstoreid) => {
        //this.props.history.push(`/offers/${bookstoreid}`);
    };

    async componentDidMount() {
        try {
            const bookstores = await BookstoreService.getAllBookstores();
            this.setState({
                bookstores: [...bookstores],
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {!!this.state.bookstores &&
                        this.state.bookstores.map((bookstore, i) => (
                            <ListItem button key={i}>
                                <ListItemIcon onClick={(event) => this.handleListItemClick(event, bookstore._id)}>
                                    <StoreIcon color="secondary" onClick={(event) => this.handleListItemClick(event, bookstore._id)} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={bookstore.name}
                                    secondary={bookstore.description}
                                    onClick={(event) => this.handleListItemClick(event, bookstore._id)}
                                ></ListItemText>
                            </ListItem>
                        ))}
                </List>
            </div>
        );
    }
}

export default withStyles(useStyles)(BookstoresList);
