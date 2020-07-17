import React, { Component } from "react";
import { createMuiTheme, useTheme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BookshelvesList from "../userprofile/BookshelvesList";
import SwapOffersList from "../userprofile/SwapOffersList";
import BasicInformation from "./BasicInformation";

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
    },
}));

const theme = createMuiTheme();

function CenteredGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container style={{ margin: 0, width: "100%" }}>
                <Grid
                    item
                    alignItems="stretch"
                    xs={7}
                    style={{
                        padding: "0",
                        paddingRight: theme.spacing(1),
                        paddingBottom: theme.spacing(2),
                    }}
                >
                    <Paper className={classes.paper} elevation={2}>
                        <Typography variant="button">Basic information</Typography>
                        <BasicInformation className={classes.basicinformation} />
                    </Paper>
                </Grid>
                <Grid
                    item
                    xs={5}
                    alignItems="stretch"
                    style={{
                        padding: "0",
                        paddingLeft: theme.spacing(1),
                        paddingBottom: theme.spacing(2),
                    }}
                >
                    <Paper className={classes.paper} elevation={2}>
                        <Typography variant="button">Favourite local bookstores</Typography>
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
                        <Typography variant="button">My swap offers</Typography>
                        <SwapOffersList/>
                    </Paper>
                </Grid>
                <Grid item xs={7} style={{ padding: "0", paddingLeft: theme.spacing(1) }}>
                    <Paper className={classes.paper} elevation={2}>
                        <Typography variant="button">My bookshelves</Typography>
                        <BookshelvesList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export class UserProfile extends Component {
    render() {
        return (
            <div style={dashboardStyle}>
                <CenteredGrid></CenteredGrid>
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
