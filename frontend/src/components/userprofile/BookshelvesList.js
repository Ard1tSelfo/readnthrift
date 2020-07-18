import React, { Component } from "react";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    deleteBookshelfModal: {
        marginTop: theme.spacing(16),
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "auto",
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "25px",
        spacing: 1
    },
});

class BookshelvesList extends Component {
    constructor(props) {
        super(props);

        this.handleAddNewBookshelf = this.handleAddNewBookshelf.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);

        this.state = {
            user: null,
            bookshelves: [],
            error: null,
            deleteBookshelfModalOpen: false,
            bookshelftodelete: null
        };
    }

    handleListItemClick = (event, bookshelfId) => {
        this.props.history.push(`me/bookshelves/${bookshelfId}`);
    };

    handleAddNewBookshelf = (event) => {
        this.props.history.push('/createbookshelf')
    };

    handleOpenDeleteBookshelfModal = (event, bookshelfId) => {
        this.setState({
            deleteBookshelfModalOpen: true,
            bookshelftodelete: bookshelfId
        });
    };

    handleCloseDeleteBookshelfModal = () => {
        this.setState({
            deleteBookshelfModalOpen: false,
        });
    };

    handleDeleteBookshelf = async (event) => {
        await BookshelfService.deleteBookshelf(this.state.bookshelftodelete);
        this.setState({
            deleteBookshelfModalOpen: false,
        });
        // this.props.history.push('/userprofile')
    };

    async componentDidMount() {
        try {
            const user = await UserService.getCurrentUser();
            const bookshelves = await BookshelfService.getBookshelvesByUser(user._id);

            console.log(bookshelves);

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
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {!!this.state.bookshelves &&
                        this.state.bookshelves.map((booksh, i) => (
                            <ListItem button key={i}                       >
                                <ListItemIcon onClick={(event) => this.handleListItemClick(event, booksh._id)}>
                                    <MenuBookIcon color="secondary" onClick={(event) => this.handleListItemClick(event, booksh._id)} />
                                </ListItemIcon>
                                <ListItemText primary={booksh.name} onClick={(event) => this.handleListItemClick(event, booksh._id)} />
                                <DeleteIcon color="secondary" onClick={(event) => this.handleOpenDeleteBookshelfModal(event, booksh._id)} />
                            </ListItem>
                        ))}
                    <Divider style={{ marginTop: "10px", marginBottom: "10px" }} variant="middle" />
                    <ListItem button onClick={(event) => this.handleAddNewBookshelf(event)}>
                        <ListItemIcon>
                            <AddBoxOutlinedIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Add new bookshelf" />
                    </ListItem>
                </List>
                <Modal open={this.state.deleteBookshelfModalOpen} onClose={this.handleCloseDeleteBookshelfModal}>
                    <div className={classes.deleteBookshelfModal}>
                        <Paper className={classes.deleteBookshelfModalPaper}>
                            <Typography id="confirmdeletebookshelftext">
                                Do your really want to delete this bookshelf?
                            </Typography>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disableElevation
                                m={2}
                                onClick={(event) => this.handleDeleteBookshelf(event)}
                            >
                                Yes, please delete this bookshelf
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disableElevation
                                m={2}
                                onClick={this.handleCloseDeleteBookshelfModal}
                            >
                                No, I don't want to progress
                            </Button>
                        </Paper>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(BookshelvesList));
