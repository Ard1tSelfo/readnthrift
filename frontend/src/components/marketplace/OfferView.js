import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import OfferService from "../../services/OfferService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%'
    },
    button: {
        marginTop: theme.spacing(2),
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
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    pageButton: {
        marginTop: theme.spacing(2),
        width: "100%",
    }
});

class OfferView extends Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
        this.buyBook = this.buyBook.bind(this);

        this.state = {
            loading: false,
            error: null,
            user: null,
            offer: null,
            book: null,
            isOwner: false,
            snackbaropen: false
        };
    }

    delete = async (e) => {
        axios.delete(`http://localhost:5000/marketplace/${this.state.offer._id}`)
        .then((res) => {
            console.log(res.data);
            this.props.history.push('/marketplace')
        })
    };

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({
            snackbaropen: false
        });
      };    

    buyBook = async (e) => {
        const offer = {
            user: this.state.offer.user,
            book: this.state.offer.book,
            cover: this.state.offer.cover,
            condition: this.state.offer.condition,
            price: this.state.offer.price,
            description: this.state.offer.description,
            open: false,
            thumbnail: this.state.offer.book.thumbnail,
            title: this.state.offer.book.title,
            author: this.state.offer.book.author
        };

        // Update offer: change `open` property to false
        axios.put(`http://localhost:5000/marketplace/${this.state.offer._id}`, offer)
        .then((res) => {
            console.log(res.data);
            this.setState({
                snackbaropen: true
            });
        })
        
        // Delete the offer from DB after the purchase
        axios.delete(`http://localhost:5000/marketplace/${this.state.offer._id}`)
        .then((res) => {
            console.log(res.data);
            this.props.history.push('/marketplace')
        })
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const user = await UserService.getCurrentUser();
            const offer = await OfferService.getOfferById(this.props.match.params.offerid)
            const book = await BookService.getBookById(offer.book);
            const isOwner = (user._id === offer.user)

            this.setState({
                offer: offer,
                user: user,
                book: book,
                loading: false,
                isOwner: isOwner
            });
        } catch (error) {
            this.setState({
                error: error,
            });
        }
    }


    render() {
        const { classes } = this.props;
        let button;
        if (this.state.isOwner) {
            button = <Button
                        variant="contained"
                        color="primary"
                        textAlign="left"
                        disableElevation
                        fullWidth
                        onClick={e => this.delete(e)}
                        style={{backgroundColor:"red"}}
                    >
                        Delete
                    </Button>
        } else {
            button = <Button
                        variant="contained"
                        color="primary"
                        textAlign="left"
                        disableElevation
                        fullWidth
                        onClick={e => this.buyBook(e)}
                    >
                        Buy this book
                    </Button>
        }
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
                                        {" "}
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
                                        {!!this.state.book && <text>{this.state.book.publication}</text>}
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
                        </Grid>
                    </Grid>
                    <Divider style={{marginTop: "15px", marginBottom: "15px"}} variant="middle" />
                    <Grid>
                        <Typography variant="body2" gutterBottom>
                            Price:{" $"}
                            {!!this.state.offer && <text>{this.state.offer.price}</text>}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {!!this.state.offer && <text>{this.state.offer.description}</text>}
                        </Typography>
                    </Grid>
                    {button}
                </Paper>
                <br />
                <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="info">
                        <Typography>You will be redirected to PayPal.</Typography>
                    </Alert>
                </Snackbar>
                
      
            </div>
        );
    }
}

export default withStyles(useStyles)(OfferView);