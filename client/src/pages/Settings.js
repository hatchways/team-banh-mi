import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import CompanySettings from "../components/Settings/CompanySettings";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { theme } from "../themes/theme";
import { AuthContext } from "../context/authContext";

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },
  listContainer: {},
  listLink: {
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
    },
  },
  title: {
    fontSize: 28,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
  },
  settingsIcon: {
    fontSize: 28,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(8),
  },
}));

const ListItem = withStyles({
  root: {
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    borderLeft: `2px solid transparent`,
    backgroundColor: theme.palette.background,
    fontSize: 16,
    fontWeight: theme.typography.fontWeightMedium,
    "&$selected": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      width: "max-content",
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
  const { logout } = useContext(AuthContext);

  const handleListItemClick = (event, listItemIndex) => {
    setSelectedListItem(listItemIndex);
    if (event.target.innerText === "Log out") {
      logout();
    }
  };

  return (
    <Grid container className={styles.root}>
      <Navbar />
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
          <CompanySettings />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Settings;
