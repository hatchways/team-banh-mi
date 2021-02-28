import React from "react";
import MentionContainer from "../components/MentionContainer";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// CSS

import { CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  screenContainer: {
    display: "flex",
  },
  mainScreen: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    flex: "1",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.title,
  },
  content: {
    marginTop: theme.spacing(9),
    maxWidth: "60%",
    marginRight: theme.spacing(12),
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
  },
  sideBar: {
    position: "fixed",
    top: "0",
  },
}));
function DashBoard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar className={classes.navBar} />
      <div className={classes.screenContainer}>
        <Sidebar className={classes.sideBar} />
        <div className={classes.mainScreen}>
          <div className={classes.content}>
            <div className={classes.mainHeader}>
              <Typography className={classes.title}>My mentions</Typography>
              <ButtonGroup color="primary" style={{ backgroundColor: "white" }}>
                <Button>Most recent</Button>
                <Button>Most popular</Button>
              </ButtonGroup>
            </div>
            <MentionContainer companyName="tesla" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
