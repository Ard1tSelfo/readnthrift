import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import BookshelfService from "../../services/BookshelfService";
import ReviewService from "../../services/ReviewService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem } from "@material-ui/core";
import ReviewList from "./ReviewList";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    buttonsGrid: {
        padding: "0",
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    reviewsGrid: {
        padding: "0",
        paddingLeft: theme.spacing(1),
    },
    bookshelfModalPaper: {
        padding: theme.spacing(2),
        width: "100%",
    },
    reviewsPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textAlign: "center",
        maxHeight: 400, 
        overflow: 'auto'
    },
    image: {
        width: 175,
        height: 175,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        marginTop: theme.spacing(1),
    },
    bookshelfModal: {
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
    reviewModal: {
        marginTop: theme.spacing(16),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "auto",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "25px",
    },
    reviewModalPaper: {
        padding: theme.spacing(2),
        width: "100%",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    pageButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    },
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
            bookshelfModalOpen: false,
            bookshelves: null,
            rating: null,
            notice: null,
            selectedBookshelf: {
                id: null,
                name: null,
            },
            reviewModalOpen: false,
            currentrating: false,
            reviews: [],
            reviewAuthor: null,
            booksnackbaropen: false,
            reviewsnackbaropen: false,
            reviewerrorsnackbaropen: false
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const book = await BookService.getBookById(this.props.match.params.bookid);
            const user = await UserService.getCurrentUser();
            const reviewAuthor = `${user.firstname} ${user.lastname}`
            const bookshelves = await BookshelfService.getBookshelvesByUser(user._id);

            const currentbookratings = await ReviewService.getReviewsByBook(
                this.props.match.params.bookid
            );
            const ratings = currentbookratings.map(function (o) {
                return o.rating;
            });
            let avgrating = 0;
            if (ratings.length > 0) {
                var ratingssum = 0;
                for (var i = 0; i < ratings.length; i++) {
                    ratingssum += parseInt(ratings[i], 10);
                }
                avgrating = ratingssum / ratings.length;
            }

            this.setState({
                user: user,
                reviewAuthor: reviewAuthor,
                book: book,
                loading: false,
                bookshelves: bookshelves,
                currentrating: avgrating,
                reviews: [...currentbookratings],
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }

    handleOpenBookshelfModal = () => {
        this.setState({
            bookshelfModalOpen: true,
        });
    };

    handleCloseBookshelfModal = () => {
        this.setState({
            bookshelfModalOpen: false,
        });
    };

    handleOpenReviewModal = () => {
        this.setState({
            reviewModalOpen: true,
        });
    };

    handleCloseReviewModal = () => {
        this.setState({
            reviewModalOpen: false,
        });
    };

    handleInputChange = (event) => {
        this.setState({
            selectedBookshelf: {
                id: event.target.value,
                name: event.target.name,
            },
        });
    };

    handleCloseBookSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            booksnackbaropen: false
        });
      };

      handleCloseReviewSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            reviewsnackbaropen: false
        });
      };

      handleCloseReviewErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            reviewerrorsnackbaropen: false
        });
      };

    handleAddBookSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            books: this.state.book._id,
        };
        try {
            await BookshelfService.addBookToBookshelf(this.state.selectedBookshelf.id, requestBody);
            this.handleCloseBookshelfModal();
            this.setState({
                booksnackbaropen: true
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    };

    handleAddReviewSubmit = async (event) => {
        const reviewBody = {
            user: this.state.user,
            book: this.state.book._id,
            rating: this.state.rating,
            notice: this.state.notice,
            author: this.state.reviewAuthor
        };
        let messages = [];
        if (this.state.rating === 0 || this.state.rating === null) {
            messages.push("Please, rate the book!");
        }

        if (messages.length > 0) {
            event.preventDefault();
            this.setState({
                reviewerrorsnackbaropen: true
            });
        } else {
            try {
                await ReviewService.addReview(reviewBody);
                this.handleCloseReviewModal();
                this.setState({
                    reviewsnackbaropen: true
                });
                window.location.reload(false);
            } catch (error) {
                this.setState({
                    error: error,
                });
            }
        }
    };

    render() {
        const { classes } = this.props;
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
                        <Grid item xs={7} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6">
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
                                        Publication:{" "}
                                        {!!this.state.book && (
                                            <text>{this.state.book.publication}</text>
                                        )}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Publisher:{" "}
                                        {!!this.state.book && (
                                            <text>{this.state.book.publisher}</text>
                                        )}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Pages:{" "}
                                        {!!this.state.book && <text>{this.state.book.pages}</text>}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        ISBN:{" "}
                                        {!!this.state.book && <text>{this.state.book.isbn}</text>}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Box component="fieldset" borderColor="transparent">
                                    <Typography component="legend">Average User Rating</Typography>
                                    <Rating
                                        name="disabled"
                                        value={this.state.currentrating}
                                        max={10}
                                        readOnly
                                    />
                                    <Button
                                        className={classes.pageButton}
                                        variant="contained"
                                        color="primary"
                                        textAlign="left"
                                        disableElevation
                                        onClick={this.handleOpenBookshelfModal}
                                    >
                                        Add to one of your bookshelves
                                    </Button>
                                    <br />
                                    <Button
                                        className={classes.pageButton}
                                        variant="contained"
                                        color="primary"
                                        textAlign="left"
                                        disableElevation
                                        onClick={this.handleOpenReviewModal}
                                    >
                                        Write a review for this book
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: "15px", marginBottom: "15px" }} variant="middle" />
                    <Grid style={{ marginLeft: "10px" }}>
                        <Typography variant="body2" gutterBottom>
                            {!!this.state.book && this.state.book.description}
                        </Typography>
                    </Grid>
                </Paper>
                <Paper className={classes.reviewsPaper} elevation={2}>
                    <Typography variant="button">Reviews</Typography>
                    <ReviewList reviews={!!this.state.reviews && this.state.reviews} />
                </Paper>

                <Modal
                    open={this.state.bookshelfModalOpen}
                    onClose={this.handleCloseBookshelfModal}
                >
                    <div className={classes.bookshelfModal}>
                        <Paper className={classes.bookshelfModalPaper}>
                            <Typography id="selectBookshelf">
                                Which bookshelf would you like to add the book to?
                            </Typography>
                            <Select
                                id="select-bookshelf"
                                value={
                                    !this.state.selectedBookshelf.id
                                        ? "default"
                                        : this.state.selectedBookshelf.id
                                }
                                onChange={this.handleInputChange}
                                label="Select bookshelf"
                                name={this.state.selectedBookshelf.name}
                                required
                                variant="outlined"
                                style={{ width: "100%" }}
                            >
                                {!!this.state.bookshelves &&
                                    this.state.bookshelves.map((booksh, i) => (
                                        <MenuItem key={i} value={booksh._id} name={booksh.name}>
                                            {booksh.name}
                                        </MenuItem>
                                    ))}
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
                <Modal open={this.state.reviewModalOpen} onClose={this.handleCloseReviewModal}>
                    <div className={classes.reviewModal}>
                        <Paper className={classes.reviewModalPaper}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">
                                    Write a review and give a rating for{" "}
                                    <i>
                                        {!!this.state.book && <text>{this.state.book.title}</text>}
                                    </i>{" "}
                                    by {!!this.state.book && <text>{this.state.book.author}</text>}
                                </Typography>
                                <Rating
                                    name="customized-10"
                                    defaultValue={0}
                                    max={10}
                                    value={this.state.rating}
                                    onChange={(e) =>
                                        this.setState({ rating: Number(e.target.value) })
                                    }
                                />
                            </Box>
                            <TextField
                                id="outlined-multiline-static"
                                label="Write your review here."
                                multiline
                                rows={20}
                                fullWidth
                                defaultValue=""
                                variant="outlined"
                                value={this.state.notice}
                                onChange={(e) => this.setState({ notice: e.target.value })}
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon>send</SendIcon>}
                                onClick={this.handleAddReviewSubmit}
                            >
                                Submit
                            </Button>
                        </Paper>
                    </div>
                </Modal>
                <Snackbar open={this.state.booksnackbaropen} autoHideDuration={6000} onClose={this.handleCloseBookSnackbar}>
                    <Alert onClose={this.handleCloseBookSnackbar} severity="success">
                        <Typography>The book has been added to your selected bookshelf!</Typography>
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.reviewsnackbaropen} autoHideDuration={6000} onClose={this.handleCloseReviewSnackbar}>
                    <Alert onClose={this.handleCloseReviewSnackbar} severity="success">
                        <Typography>Your review has been added!</Typography>
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.reviewerrorsnackbaropen} autoHideDuration={6000} onClose={this.handleCloseReviewErrorSnackbar}>
                    <Alert onClose={this.handleCloseReviewErrorSnackbar} severity="info">
                        <Typography>Please rate the book before submitting the review.</Typography>
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles)(BookView);
