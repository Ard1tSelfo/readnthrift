import React, { Component } from "react";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export function SelectedListItem({ bookshelves }) {
    const classes = useStyles();

    const handleListItemClick = (event, bookshelfId) => {};

    const handleAddNewBookshelf = (event) => {};

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {!!bookshelves &&
                    bookshelves.map((booksh, i) => (
                        <ListItem button key={i}
                        onClick={(event) => handleListItemClick(event, booksh._id)}>
                            <ListItemIcon>
                                <MenuBookIcon color="secondary"/>
                            </ListItemIcon>
                            <ListItemText primary={booksh.name}/>
                        </ListItem>
                    ))}
                <Divider style={{marginTop: "10px", marginBottom: "10px"}} variant="middle" />
                <ListItem button onClick={(event) => handleAddNewBookshelf(event)}>
                    <ListItemIcon>
                        <AddBoxOutlinedIcon color="primary"/>
                    </ListItemIcon>
                    <ListItemText primary="Add new bookshelf" />
                </ListItem>
            </List>
        </div>
    );
}

class BookshelvesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            bookshelves: [],
            error: null,
        };
    }

    async componentDidMount() {
        try {
            const user = await UserService.getCurrentUser();
            const bookshelves = await BookshelfService.getBookshelvesByUser(user._id);

            this.setState({
                user: user,
                bookshelves: [...bookshelves],
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        return (
            <div>
                <SelectedListItem
                    bookshelves={!!this.state.bookshelves && this.state.bookshelves}
                />
            </div>
        );
    }
}

export default BookshelvesList;
