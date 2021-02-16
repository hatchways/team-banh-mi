import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoodIconSmile from "@material-ui/icons/SentimentSatisfiedOutlined";
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

export default function MoodIcon(props) {
  const classes = useStyles();

  if (props.mood === "good") return <MoodIconSmile className={classes.icon} />;
  if (props.mood === "med")
    return <SentimentDissatisfiedIcon className={classes.icon} />;
  if (props.mood === "bad")
    return <SentimentVeryDissatisfiedIcon className={classes.icon} />;
}
