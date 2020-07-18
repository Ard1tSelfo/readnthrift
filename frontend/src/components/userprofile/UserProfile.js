import React, { Component } from "react";
import { createMuiTheme, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BookshelvesList from "../userprofile/BookshelvesList";
import SwapOffersList from "../userprofile/SwapOffersList";
import BasicInformation from "./BasicInformation";
import ScrollableList from "../common/ScrollableList";
import BookService from "../../services/BookService";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary,
        //margin: theme.spacing(1),
        //marginBottom: theme.spacing(1)
        height: "100%",
    },
    grid: {
        padding: theme.spacing(0),
    },
    basicinformation: {
        textAlign: "left",
        color: theme.palette.text.primary,
    }
}));

const theme = createMuiTheme();

function CenteredGrid(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container style={{ margin: 0, width: "100%" }}>
                <Grid
                    item
                    xs={12}
                    alignItems="stretch"
                    style={{
                        padding: "0",
                        paddingBottom: theme.spacing(2),
                    }}
                >
                    <Paper className={classes.paper} elevation={2}>
                        <BasicInformation className={classes.basicinformation} />
                        <Typography variant="button">Explore latest books</Typography>
                        <ScrollableList books={props.books} />
                        <Button component={Link} to={`/browsebooks`} color="primary" > Show all books <ExpandMoreIcon /> </Button>

                    </Paper>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="stretch"
                direction="row"
                style={{ margin: 0, width: "100%", marginTop: theme.spacing(2) }}
            >
                <Grid item xs={5} style={{ padding: "0", paddingRight: theme.spacing(1) }}>
                    <Paper className={classes.paper} elevation={2}>
                        <LocalOfferIcon style={{ marginRight: 10, marginBottom: -5 }} color="primary" />
                        <Typography variant="button">My swap offers</Typography>
                        <SwapOffersList />
                    </Paper>
                </Grid>
                <Grid item xs={7} style={{ padding: "0", paddingLeft: theme.spacing(1) }}>
                    <Paper className={classes.paper} elevation={2}>
                        <MenuBookIcon color="primary" style={{ marginRight: 10, marginBottom: -5 }} />
                        <Typography variant="button">My bookshelves </Typography>
                        <BookshelvesList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            error: null
        };
    }

    async componentDidMount() {
        try {
            const books = await BookService.getAllBooks();
            this.setState({
                books: [...books].slice(books.length - 15, books.length),
            });
        } catch (error) {
            //error.message
            this.setState({
                error: error,
            });
        }
    }

    render() {
        return (
            <div style={dashboardStyle}>
                <CenteredGrid books={this.state.books}></CenteredGrid>
            </div>
        );
    }
}

const dashboardStyle = {
    marginTop: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
};

export default UserProfile;
