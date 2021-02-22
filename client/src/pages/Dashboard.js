import React from "react";
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
    width: "100%",
    height: "90vh",
    display: "flex",
  },

  mainScreen: {
    width: "100%",
    height: "90vh",
    backgroundColor: "white",
    flex: "1",
  },
  content: {
    marginLeft: "40px",
    marginRight: "40px",
    marginTop: "100px",
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "red",
    marginTop: "1vh",
    marginBottom: "1vh",
  },
  navBar: {
    position: "fixed",
    top: "0",
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
              <Typography>My Mentions</Typography>
              <ButtonGroup color="primary" style={{ backgroundColor: "white" }}>
                <Button>Most recent</Button>
                <Button>Most popular</Button>
              </ButtonGroup>
            </div>
            <ResultCard />
          </div>
        </div>
      </div>
    </div>
  );
}

const ResultCard = () => {
  return (
    <CardContent className="card">
      <Typography> Company Name Title Holder</Typography>
      <Typography> The company discriptions lalalalalalalallalala</Typography>
    </CardContent>
  );
};
export default DashBoard;
