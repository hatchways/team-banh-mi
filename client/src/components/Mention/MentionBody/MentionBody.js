import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  body: {
    fontSize: ".8rem",
    color: "#888",
    fontWeight: 500,
  },
}));

const cutAndAppendEllipsis = (str) => {
  return str.substring(0, 290) + "...";
};

export default function MentionBody({ body }) {
  const styles = useStyles();
  const shortDescription = cutAndAppendEllipsis(body);
  return (
    <Typography variant="body2" className={styles.body}>
      {shortDescription}
    </Typography>
  );
}
