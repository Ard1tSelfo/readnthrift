import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import BookService from "../../services/BookService";
import UserService from "../../services/UserService";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        marginTop: theme.spacing(2),
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
});

class BookView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            book: null,
            error: null,
            user: null,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            const book = await BookService.getBookById(this.props.match.params.bookid);
            console.log(book);
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
                book: book,
                loading: false,
            });
        } catch (error) {
            //error.message
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
                                    <Typography gutterBottom variant="subtitle1">
                                        Title: {!!this.state.book &&  <text>{this.state.book.title}</text> }
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Author: {!!this.state.book &&  <text>{this.state.book.author}</text> }
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Genre: {!!this.state.book &&  <text>{this.state.book.genre}</text> }
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Publisher: {!!this.state.book &&  <text>{this.state.book.publisher}</text> }
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ISBN: {!!this.state.book &&  <text>{this.state.book.isbn}</text> }
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Rating</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(BookView);
