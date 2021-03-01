import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progress: {
    color: "royalblue",
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        className={classes.progress}
        size="3rem"
        variant="indeterminate"
      />
    </div>
  );
};

export default Spinner;
