import React, { useState } from "react";
import Navbar from "./navbar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
import MuiListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { theme } from "../themes/theme";

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
    height: "100vw",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "whitesmoke",
    padding: theme.spacing(5),
  },
  listContainer: {},
  title: {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
  },
  settingsIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(8),
  },
}));

const ListItem = withStyles({
  root: {
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    borderLeft: `2px solid transparent`,
    backgroundColor: theme.palette.background,
    fontSize: theme.typography.fontSize, // defaults to 14px
    "&$selected": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
    "&$selected:hover": {
      backgroundColor: "white",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  selected: {},
})(MuiListItem);

function Settings() {
  const styles = useStyles();
  const [selectedListItem, setSelectedListItem] = useState(0);
  const handleListItemClick = (event, listItemIndex) => {
    setSelectedListItem(listItemIndex);
  };
  return (
    <Grid container className={styles.root}>
      {/* <Navbar /> */}
      <Grid container item>
        <Grid item container xs={3} className={styles.sidebarContainer}>
          <Grid item className={styles.titleContainer}>
            <Typography variant="h5" className={styles.title}>
              Settings
            </Typography>
            <SettingsIcon className={styles.settingsIcon} />
          </Grid>
          <Grid item className={styles.listContainer}>
            <List>
              <ListItem
                selected={selectedListItem === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                Company
              </ListItem>
              <ListItem
                selected={selectedListItem === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                Security
              </ListItem>
              <ListItem
                selected={selectedListItem === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                Log out
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          This is the body
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Settings;
