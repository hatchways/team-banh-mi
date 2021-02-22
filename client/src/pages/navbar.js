import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 65,
    padding: 20,
    backgroundColor: "#6583F2",
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  search: {
    position: 'relative',
    borderRadius: 100,
    height: 40,
    outline: 'none',
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    width: "40%",
  },

  searchIcon: {
    color: '#6583F2',
  },

  settingsIcon: {
    color: '#94A8F5',
  }
}));

export default function Navbar() {
  const classes = useStyles();
  return (
      <AppBar position="fixed" className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          mentions<span style={{ color: "#284097" }}>crawler.</span>
        </Typography>
        <OutlinedInput
          color='#6583F2'
          placeholder="Search…"
          className={classes.search}
          InputProps={{ "aria-label": "search" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" className={classes.searchIcon} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <IconButton className={classes.settingsIcon} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </AppBar>
  );
}
