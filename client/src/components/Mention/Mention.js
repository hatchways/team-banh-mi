import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import MoodIcon from "../Mention/MoodIcon/MoodIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import MentionHeading from "../Mention/MentionHeading/MentionHeading";
import MentionBody from "../Mention/MentionBody/MentionBody";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { DialogContent, DialogTitle } from "@material-ui/core";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import axios from "axios";

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
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
    display: "flex",
    margin: 0,
  },
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 36,
    textAlign: "center",
  },
  content: {
    marginTop: 20,
    flexGrow: 9,
    backgroundColor: theme.palette.common.white,
    fontSize: 25,
  },
  dialogImage: {
    marginTop: 20,
    height: 300,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
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
      return imgUrl === "default" || imgUrl === "none" || imgUrl === "self"
        ? "/images/reddit-logo.png"
        : imgUrl;
    case "Twitter":
      return imgUrl ? imgUrl : "/images/twitter-logo.png";
    default:
      return imgUrl;
  }
};

function Mention({
  id,
  title,
  source,
  body,
  mood,
  imgSrc,
  imgAlt,
  url,
  favorite,
}) {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(favorite);

  const img = parseDefaultImages(source, imgSrc);
  const [dialog, setDialog] = React.useState(false);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
  const toggleFavorites = async (e) => {
    e.stopPropagation();
    await axios.put(`http://localhost:3001/mention/favToggle/${id}`);
    setIsFavorite((prevFav) => !prevFav);
  };

  const favIcon = isFavorite ? (
    <FavoriteRoundedIcon
      className={classes.likeIcon}
      onClick={(e) => toggleFavorites(e)}
    />
  ) : (
    <FavoriteBorderRoundedIcon
      className={classes.likeIcon}
      onClick={(e) => toggleFavorites(e)}
    />
  );

  return (
    <div>
      <Card
        className={classes.root}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {favIcon}
        <CardMedia className={classes.image} image={img} title={imgAlt} />
        <CardContent>
          <MoodIcon mood={mood} />
          <MentionHeading title={title} source={source} />
          <MentionBody body={body} />
        </CardContent>
      </Card>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={dialog}
        onClose={handleClose}
      >
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <img src={img} className={classes.dialogImage} alt="mentionImage" />
        <DialogContent className={classes.content}>{body}</DialogContent>
        <Button
          variant="contained"
          color="primary"
          className={classes.url}
          href={url}
          target="_blank"
        >
          Check Mention on Website
        </Button>
      </Dialog>
    </div>
  );
}

Mention.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.string,
  body: PropTypes.string,
  mood: PropTypes.oneOf(["good", "neutral", "bad"]),
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  url: PropTypes.string,
  favorite: PropTypes.bool,
};

export default Mention;
