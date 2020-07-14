import React, { Component } from "react";
import { createMuiTheme, useTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OfferService from "../../services/OfferService";
import UserService from "../../services/UserService";
import BookService from "../../services/BookService";
import BrowseOffersTable from "../marketplace/BrowseOffersTable";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary
        //margin: theme.spacing(1),
        //marginBottom: theme.spacing(1)
    },
    grid: {
        padding: theme.spacing(0),
    }
}));

const theme = createMuiTheme();

function CenteredGrid( {e, f, g} ) {
    const classes = useStyles(useTheme());
    const theme = useTheme();

    return (
        <div className={classes.root}>
             <br />
            <Grid container style={{margin:0,width:"100%"}}>
                <Grid item alignItems="stretch" xs={7} style={{padding:"0",paddingRight:theme.spacing(1), paddingBottom:theme.spacing(2)}}>
                    <Paper className={classes.paper} elevation={2} style={{height:"100%"}}>
                        <h4>Lastest offers</h4>
                        <BrowseOffersTable data={e}/>
                    </Paper>
                </Grid>
                <Grid item xs={5} direction="column" style={{padding:"0", paddingLeft:theme.spacing(1)}}>
                    <Paper className={classes.paper} elevation={2} style={{marginBottom:theme.spacing(2)}}>
                        <h4>Do you want to trade a book?</h4>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={event => window.location.href="/choosebook"}
                        >
                            Create an offer
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={2} style={{marginTop:theme.spacing(1)}}>
                        <h4>Your offers</h4>
                        <BrowseOffersTable data={f}/>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}

class Marketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            offers: [],
            myoffers: [],
            error: null,
            user: null,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });

        try {
            //const offers = await OfferService.getAllOffers();
            //const myoffers = await OfferService.getAllOffers();
            const books = await BookService.getAllBooks();
            const offers = await BookService.getAllBooks();
            const user = await UserService.getCurrentUser();
            this.setState({
                user: user,
                offers: [...offers],
                myoffers: [...books],
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
        return (
            <div>
                <CenteredGrid e={this.state.offers} f={this.state.myoffers} g={this.props}></CenteredGrid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Marketplace);