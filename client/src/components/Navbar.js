import React, { useContext, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useLocation } from "react-router-dom";
import * as actionTypes from "../store/actionTypes";
import { UserStateContext, UserDispatchContext } from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(11),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 22,
  },

  titleSpan: {
    color: theme.palette.primary.dark,
  },

  search: {
    position: "relative",
    borderRadius: 100,
    height: theme.spacing(6),
    outline: "none",
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    marginRight: theme.spacing(2),
    width: "40%",
  },

  searchIcon: {
    color: theme.palette.primary.main,
    marginRight: -12,
    fontSize: 26,
  },

  settingsIcon: {
    color: theme.palette.primary.light,
    fontSize: 32,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);

  let navBarIcon = null;
  if (location.pathname === "/settings") {
    navBarIcon = (
      <Link to="/dashboard">
        <IconButton aria-label="home">
          <HomeRoundedIcon className={classes.settingsIcon} />
        </IconButton>
      </Link>
    );
  } else {
    navBarIcon = (
      <Link to="/settings">
        <IconButton aria-label="settings">
          <SettingsIcon className={classes.settingsIcon} />
        </IconButton>
      </Link>
    );
  }

  let favoritesIcon = null;
  if (state.onlyFavorites) {
    favoritesIcon = (
      <IconButton
        aria-label="favorites"
        onClick={() => dispatch({ type: actionTypes.SHOW_ALL_MENTIONS })}
      >
        <FavoriteRoundedIcon className={classes.settingsIcon} />
      </IconButton>
    );
  } else {
    favoritesIcon = (
      <IconButton
        aria-label="favorites"
        onClick={() => dispatch({ type: actionTypes.SHOW_ONLY_FAVORITES })}
      >
        <FavoriteBorderRoundedIcon className={classes.settingsIcon} />
      </IconButton>
    );
  }

  return (
    <AppBar position="sticky" className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        mentions<span className={classes.titleSpan}>crawler.</span>
      </Typography>
      <OutlinedInput
        placeholder="Search…"
        className={classes.search}
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" aria-label="search">
              <SearchIcon className={classes.searchIcon} />
            </IconButton>
          </InputAdornment>
        }
      />
      <div>
        {favoritesIcon}
        {navBarIcon}
      </div>
    </AppBar>
  );
}
