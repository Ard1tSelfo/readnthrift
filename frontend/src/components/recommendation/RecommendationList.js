import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import { Link } from 'react-router-dom'
import { Typography } from "@material-ui/core";
 
const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: 'auto',
    marginBottom: '2rem',
    position: 'relative',
  },
  scrollable: {
    width: '100%',
    height: '15rem',
    color: 'black',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    scrollBehavior: 'smooth'
  },
  navButtons: {
    position: 'absolute',
    height: '100%',
    color: 'white',
    borderRadius: 0,
    top: 0,
    zIndex: 1
  },
  navButtonIcon: {
    fontSize: '2rem',
    backgroundColor: 'rgb(242, 242, 242, 0.5)',
    padding: '0.8rem 0.4rem'
  },
  leftButton: {
    left: 0
  },
  rightButton: {
    right: 0
  }
}));
 
const imageStyles = makeStyles((theme) => ({
  imageWrapper: {
    flex: '0 0 auto',
    width: '12%',
    height: '13rem',
    margin: '0.5rem',
    border: '2px solid #dce8da',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  imageContainer: {
    objectFit: 'cover',
    width: '100%',
    height: 'auto',
  }
}));
 
function RecommendationItem(props) {
  const classes = imageStyles();
 
  return (
    <Button component={Link} to={`/books/${props.id}`} className={classes.imageWrapper} >
      <img className={classes.imageContainer} src={props.image} />
    </Button>
  )
}
 
 
export default function RecommendationList(props) {
  const classes = useStyles();
 
  const scrollLeft = () => {
    const container = document.getElementById("scrollableContainer")
    container.scrollLeft = container.scrollLeft - container.clientWidth;
  }
 
  const scrollRight = () => {
    const container = document.getElementById("scrollableContainer")
    container.scrollLeft = container.scrollLeft + container.clientWidth;
  }
 
  return (
    <div>
      <Typography variant="h5"> Our recommendations based on this collection:</Typography>
  <Typography variant="h7"> Most frequent tags in your collection include
  {props.tags.map((tag) => (<i> {tag}; </i>))} </Typography>
 
      <div className={classes.wrapper}>
        <IconButton onClick={() => scrollLeft()} className={[classes.leftButton, classes.navButtons].join(" ")}>
          <ArrowBackIos className={classes.navButtonIcon} />
        </IconButton>
        <div id="scrollableContainer" className={[classes.scrollable, "scrollable"].join(" ")}>
          {props.books.map((book) => (
            <RecommendationItem
              key={book && book._id}
              image={book && book.thumbnail}
              id={book && book._id}
            />
          ))}
        </div>
        <IconButton onClick={() => scrollRight()} className={[classes.rightButton, classes.navButtons].join(" ")}>
          <ArrowForwardIos className={classes.navButtonIcon} />
        </IconButton>
      </div>
    </div>
  );
}