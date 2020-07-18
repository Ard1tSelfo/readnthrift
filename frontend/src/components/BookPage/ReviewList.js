import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "auto",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

function ReviewItem(props) {
    const classes = useStyles();
    
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Rating name="disabled" value={props.rating} max={10} readOnly />
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body1"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {props.author} 
                            </Typography>
                            {" "}{props.notice}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="middle" component="li" />
        </>
    );
}

export default function AlignItemsList(props) {
    const classes = useStyles();
    
    return (
        <List className={classes.root}>
            {!!props.reviews && props.reviews.map((review) => (
            <ReviewItem
              key={review && review._id}
              rating={review && review.rating}
              author={review && review.author}
              notice={review && review.notice}
            />
          ))}
        </List>
    );
}
