import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import MoodIcon from "../Mention/MoodIcon/MoodIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import MentionHeading from "../Mention/MentionHeading/MentionHeading";
import MentionBody from "../Mention/MentionBody/MentionBody";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    maxHeight: 150,
    display: "flex",
    flexDirection: "row",
  },
  media: {
    height: "max",
    width: 200,
  },
}));

function Mention({ title, source, body, mood, imgSrc, imgAlt }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={imgSrc} title={imgAlt} />
      <CardContent>
        <MoodIcon mood={mood} />
        <MentionHeading title={title} source={source} />
        <MentionBody body={body} />
      </CardContent>
    </Card>
  );
}

Mention.propTypes = {
  title: PropTypes.string,
  source: PropTypes.string,
  body: PropTypes.string,
  mood: PropTypes.oneOf(["good", "med", "bad"]),
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
};

export default Mention;
