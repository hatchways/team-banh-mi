import React, { useState, useContext, useReducer, useEffect } from "react";
import MentionContainer from "../components/MentionContainer";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { userReducer, userInitialState } from "../store/userReducer";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import * as actionTypes from "../store/actionTypes";

// CSS
import { CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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
  toggleButtonsContainer: {
    backgroundColor: theme.palette.background.toggles,
    display: "flex",
    padding: theme.spacing(0.5),
    height: theme.spacing(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    border: "none",
  },
  toggleButtons: {
    borderRadius: 100,
    border: "none",
    color: theme.palette.primary.main,
    fontSize: theme.typography.h6,
    padding: theme.spacing(1),
    height: theme.spacing(4),
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
    // top: "0",
  },
}));

function DashBoard() {
  const [order, setOrder] = useState("most recent");
  // const authContext = useContext(AuthContext);
  const { userDispatch, id } = useContext(UserContext);
  // const [userState] = useReducer(userReducer, userInitialState);
  const classes = useStyles();

  const handleOrderChange = (event, newOrder) => {
    setOrder(newOrder);
  };

  useEffect(() => {
    const populateUserReducer = async (id) => {
      const { data } = await axios(`http://localhost:3001/user/${id}`);
      userDispatch({ type: actionTypes.UPDATE_USER_DATA, user: data });
    };
    populateUserReducer(id);
  }, [id, userDispatch]);

  return (
    <div className={classes.root}>
      <Navbar className={classes.navBar} />
      <div className={classes.screenContainer}>
        <Sidebar className={classes.sideBar} />
        <div className={classes.mainScreen}>
          <div className={classes.content}>
            <div className={classes.mainHeader}>
              <Typography className={classes.title}>My mentions</Typography>
              <ToggleButtonGroup
                className={classes.toggleButtonsContainer}
                exclusive
                size="small"
                value={order}
                onChange={handleOrderChange}
                aria-label="mentions order"
              >
                <ToggleButton
                  className={classes.toggleButtons}
                  value="most recent"
                  aria-label="most recent"
                >
                  Most recent
                </ToggleButton>
                <ToggleButton
                  className={classes.toggleButtons}
                  value="most popular"
                  aria-label="most popular"
                >
                  Most popular
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <MentionContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
