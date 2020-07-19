import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import BookstoresMap from "./bookstoresMap";
import BookstoresList from "./bookstoresList";
import { Typography } from "@material-ui/core";

const useStyles = (theme) => ({
    gridMap: {
        display: "flex",
        flexDirection: "row",
        padding: "0",
        paddingRight: theme.spacing(1),
    },
    gridList: {
        display: "flex",
        flexDirection: "row",
        padding: "0",
        paddingLeft: theme.spacing(1),
    },
    gridContainer: {
        margin: 0,
        width: "100%",
        marginTop: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary,
        margin: theme.spacing(1),
        height: "100%",
    },
    mapPaper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        height: "100%",
    }
});

class ExploreLocalBookstores extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.gridContainer} container alignItems="stretch" direction="row">
                <Grid className={classes.grid} item xs={8}>
                    <div className={classes.mapPaper} elevation={2}>
                        <BookstoresMap/>
                    </div>
                </Grid>
                <Grid className={classes.grid} item xs={4}>
                    <Paper className={classes.paper} elevation={2}>
                        <Typography variant="button">Local Bookstores</Typography>
                        <BookstoresList/>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(ExploreLocalBookstores);
