import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginBottom: 5,
    maxWidth: "95%",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#AAA",
  },
});

export default function MentionHeading({ title, source }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Typography variant="subtitle1" className={styles.title}>
        {title}
      </Typography>
      <Typography variant="subtitle2" className={styles.subtitle}>
        {source}
      </Typography>
    </div>
  );
}
