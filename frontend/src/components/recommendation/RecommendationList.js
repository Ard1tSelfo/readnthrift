import React from "react";
import { Typography } from "@material-ui/core";

import ScrollableList from "../common/ScrollableList";

export default function RecommendationList(props) {
  return (
    <div>
      <Typography variant="h5"> Our recommendations based on this collection:</Typography>
      <Typography variant="h6"> Most frequent tags in your collection include
  {props.tags.map((tag) => (<i> {tag}; </i>))} </Typography>
      <ScrollableList books={props.books} />
    </div>
  );
}
