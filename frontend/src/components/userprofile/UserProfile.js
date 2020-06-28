import React, { Component } from 'react';
import { createMuiTheme, useTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    padding: theme.spacing(0),
  }
}));

const theme = createMuiTheme();

function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{margin:2, width:"100%"}}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h>User name</h>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} >Description</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Booklists</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Reviews</Paper>
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