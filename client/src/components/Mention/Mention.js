import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import MoodIcon from "../Mention/MoodIcon/MoodIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Image from "../../image/sample-image.jpg";
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

export default function Mention({ title, source, body, mood }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={Image} title="random image" />
      <CardContent>
        <MoodIcon mood={mood} />
        <MentionHeading title={title} source={source} />
        <MentionBody body={body} />
      </CardContent>
    </Card>
  );
}
