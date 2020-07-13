import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Divider from '@material-ui/core/Divider';
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2)
    },
    modalPaper: {
        padding: theme.spacing(2),
        width: "100%",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    modal: {
        marginTop: theme.spacing(16),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "auto",
        width: "35%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "25px",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
});

class BookView extends Component {
    constructor(props) {
        super(props);

        this.handleAddBookSubmit = this.handleAddBookSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            loading: false,
            book: null,
            error: null,
            user: null,
            modalOpen: false,
            bookshelves: null,
            selectedBookshelf: {
                id: null,
                name: null
            }
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const book = await BookService.getBookById(this.props.match.params.bookid);
            const user = await UserService.getCurrentUser();
            const bookshelves = await BookshelfService.getBookshelvesByUser(user._id);
            this.setState({
                user: user,
                book: book,
                loading: false,
                bookshelves: bookshelves
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    handleOpenModal = () => {
        this.setState({
            modalOpen: true,
        });
    };

    handleCloseModal = () => {
        this.setState({
            modalOpen: false,
        });
    };

    handleInputChange = (event) => {
        this.setState({
            selectedBookshelf: {
                id: event.target.value,
                name: event.target.name
            }
        });
    };

    handleAddBookSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            books: this.state.book._id
        };
        try {
            await BookshelfService.addBookToBookshelf(this.state.selectedBookshelf.id, requestBody);
            this.handleCloseModal();
            alert(`"${this.state.book.title}" has been added to your selected bookshelf !`  )
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { router, params, location, routes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img
                                    className={classes.img}
                                    alt="Title"
                                    src={this.state.book ? this.state.book.thumbnail : ""}
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="body1">
                                        Title:{" "}
                                        {!!this.state.book && <text>{this.state.book.title}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Author:{" "}
                                        {!!this.state.book && <text>{this.state.book.author}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Genre:{" "}
                                        {!!this.state.book && <text>{this.state.book.genre}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Publisher:{" "}
                                        {!!this.state.book && (
                                            <text>{this.state.book.publisher}</text>
                                        )}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ISBN:{" "}
                                        {!!this.state.book && <text>{this.state.book.isbn}</text>}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Rating</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider style={{marginTop: "15px", marginBottom: "15px"}} variant="middle" />
                    <Grid>
                        <Typography variant="body2" gutterBottom>
                            {!!this.state.book && <text>{this.state.book.description}</text>}
                        </Typography>
                    </Grid>
                    <Divider style={{marginTop: "15px", marginBottom: "15px"}} variant="middle" />
                </Paper>
                

                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.handleOpenModal}
                >
                    Add this book to one of your bookshelfs
                </Button>

                <Modal open={this.state.modalOpen} onClose={this.handleCloseModal}>
                    <div className={classes.modal}>
                        <Paper className={classes.modalPaper}>
                            <Typography id="selectBookshelf">
                                Which bookshelf would you like to add the book to?
                            </Typography>
                            <Select
                                id="select-bookshelf"
                                value={!this.state.selectedBookshelf.id ? "default" : this.state.selectedBookshelf.id}
                                onChange={this.handleInputChange}
                                label="Select bookshelf"
                                name={this.state.selectedBookshelf.name}
                                required
                                variant="outlined"
                                style={{ width: "100%" }}
                            >
                                {!!this.state.bookshelves && this.state.bookshelves.map((booksh, i) => 
                                <MenuItem key={i} value={booksh._id} name={booksh.name}>{booksh.name}</MenuItem>)}
                            </Select>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={this.handleAddBookSubmit}
                            >
                                Add book
                            </Button>
                        </Paper>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(useStyles)(BookView);