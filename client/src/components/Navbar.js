import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    padding: 30,
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
    height: 45,
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

  return (
    <AppBar position="fixed" className={classes.root}>
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
      <Link to="/settings">
        <IconButton aria-label="settings">
          <SettingsIcon className={classes.settingsIcon} />
        </IconButton>
      </Link>
    </AppBar>
  );
}
