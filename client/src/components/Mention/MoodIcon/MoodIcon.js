import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoodIconSmile from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles({
  icon: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: "1.6rem",
    color: "royalblue",
  },
});

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
