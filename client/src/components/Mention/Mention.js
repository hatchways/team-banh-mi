import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import MoodIcon from "../Mention/MoodIcon/MoodIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import MentionHeading from "../Mention/MentionHeading/MentionHeading";
import MentionBody from "../Mention/MentionBody/MentionBody";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: 10,
    maxHeight: 150,
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    border: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.20)",
  },
  image: {
    height: 150,
    width: 150,
    flexShrink: 0,
    flexGrow: 0,
  },
  likeIcon: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
  },
}));

const parseDefaultImages = (source, imgUrl) => {
  switch (source) {
    case "reddit":
      return imgUrl === "default" || imgUrl === "none"
        ? "/images/reddit-logo.png"
        : imgUrl;
    case "Twitter":
      return imgUrl ? imgUrl : "/images/twitter-logo.png";
    default:
      return imgUrl;
  }
};

function Mention({ title, source, body, mood, imgSrc, imgAlt, favorite }) {
  const classes = useStyles();

  const img = parseDefaultImages(source, imgSrc);

  const favIcon = favorite ? (
    <FavoriteRoundedIcon className={classes.likeIcon} />
  ) : (
    <FavoriteBorderRoundedIcon className={classes.likeIcon} />
  );

  return (
    <Card className={classes.root} variant="outlined">
      {favIcon}
      <CardMedia className={classes.image} image={img} title={imgAlt} />
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
  mood: PropTypes.oneOf(["good", "average", "bad"]),
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
};

export default Mention;
