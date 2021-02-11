import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  }
}));

export default function Navbar(){
  const classes = useStyles();
  return(
  <div className={classes.root}>
    <AppBar position = "static">
      <Toolbar>
        <Typography variant = "h6" className={classes.title}>
          mentions<span style={{color:'black'}}>Crawler</span>
        </Typography>
        
        <InputBase
              placeholder="Company Name"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        <SettingsIcon/>
      </Toolbar>
    </AppBar> 
  </div>
  )
}

