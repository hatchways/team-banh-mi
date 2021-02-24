import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoodIconSmile from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
  },
}));

export default function MoodIcon({ mood }) {
  const classes = useStyles();

  switch (mood) {
    case "good":
      return <MoodIconSmile className={classes.icon} />;
    case "average":
      return <SentimentDissatisfiedIcon className={classes.icon} />;
    case "bad":
      return <SentimentVeryDissatisfiedIcon className={classes.icon} />;
    default:
      return <SentimentSatisfiedIcon className={classes.icon} />;
  }
}
