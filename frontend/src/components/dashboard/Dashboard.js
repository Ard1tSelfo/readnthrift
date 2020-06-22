import React, { Component } from "react";
import { createMuiTheme, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

function CenteredGrid() {
    const classes = useStyles(useTheme());
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Grid container style={{margin:0,width:"100%"}}>
                <Grid item alignItems="stretch" xs={7} style={{padding:"0",paddingRight:theme.spacing(1), paddingBottom:theme.spacing(2)}}>
                    <Paper className={classes.paper} elevation={2} style={{height:"100%"}}>
                        <h4>News Feed</h4>
                    </Paper>
                </Grid>
                <Grid item xs={5} direction="column" style={{padding:"0", paddingLeft:theme.spacing(1)}}>
                    <Paper className={classes.paper} elevation={2} style={{marginBottom:theme.spacing(2)}}>
                        <h4>New recommendations</h4>
                    </Paper>
                    <Paper className={classes.paper} elevation={2} style={{marginTop:theme.spacing(1)}}>
                        <h4>Favourite local stores</h4>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container alignItems="stretch" direction="row" style={{margin:0,width:"100%", marginTop:theme.spacing(2)}}>
                <Grid item xs={5} style={{padding:"0", paddingRight: theme.spacing(1)}}>
                    <Paper className={classes.paper} elevation={2}>
                        <h4>Events</h4>
                    </Paper>
                </Grid>
                <Grid item xs={7} style={{padding:"0", paddingLeft: theme.spacing(1)}}>
                    <Paper className={classes.paper} elevation={2}>
                        <h4>Favourite books</h4>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export class Dashboard extends Component {
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
    paddingRight: 0
};

export default Dashboard;
