import React, { Component } from "react";
import { useTheme, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import OfferService from "../../services/OfferService";
import UserService from "../../services/UserService";
import BrowseOffersTable from "../marketplace/BrowseOffersTable";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary,
    },
    grid: {
        padding: theme.spacing(0),
    },
}));

function CenteredGrid({ e, f, g }) {
    const classes = useStyles(useTheme());
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <br/>
            <Grid container style={{ margin: 0, width: "100%" }}>
                <Grid
                    item
                    xs={7}
                    style={{
                        padding: "0",
                        paddingRight: theme.spacing(1),
                    }}
                >
                    <BrowseOffersTable data={e} tableTitle="Latest offers" />
                </Grid>
                <Grid
                    item
                    xs={5}
                    direction="column"
                    style={{ padding: "0", paddingLeft: theme.spacing(1) }}
                >
                    <Paper
                        className={classes.paper}
                        elevation={2}
                        style={{ marginBottom: theme.spacing(2) }}
                    >
                        <Typography variant="h6">Do you want to trade a book?</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(event) => (window.location.href = "/choosebook")}
                            style={{ marginTop: theme.spacing(1) }}
                        >
                            Create an offer
                        </Button>
                    </Paper>
                    <BrowseOffersTable data={f} tableTitle="Your offers" />
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
            const offers = await OfferService.getAllOpenOffers();
            const user = await UserService.getCurrentUser();
            const myoffers = await OfferService.getOffersByUser(user._id);
            //const myoffers = await OfferService.getOpenOffersByUser(user._id);
            this.setState({
                user: user,
                offers: [...offers],
                myoffers: [...myoffers],
                loading: false,
            });
        } catch (error) {
            // TODO error.message
            this.setState({
                error: error,
            });
        }
    }

    render() {
        return (
            <div>
                <CenteredGrid
                    e={this.state.offers}
                    f={this.state.myoffers}
                    g={this.props}
                ></CenteredGrid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Marketplace);
