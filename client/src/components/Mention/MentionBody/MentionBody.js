import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// TODO: Fix clamping text with ellipses is not working as expected.
const useStyles = makeStyles((theme) => ({
  body: {
    "--line-height": "1.4rem",
    "--max-lines": 3,
    lineHeight: "var(--line-height)",
    fontSize: ".8rem",
    color: "#888",
    fontWeight: 500,
    position: "relative",
    maxHeight: "calc(var(--line-height) * var(--max-lines)",
    overflow: "hidden",
    paddingRight: "1rem",
    "&::before": {
      position: "absolute",
      content: '"..."',
      "inset-block-end": 0,
      "inset-inline-end": 0,
    },
    "&::after": {
      position: "absolute",
      content: '""',
      "inset-inline-end": 0,
      width: "1rem",
      height: "1rem",
      background: "white",
    },
  },
}));

export default function MentionBody({ body }) {
  const styles = useStyles();
  return (
    <Typography variant="body2" className={styles.body}>
      {body}
    </Typography>
  );
}
