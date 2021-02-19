import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div className={classes.root} position="fixed">
      <Box
        display="flex"
        flexDirection="column"
        p={1}
        bgcolor="green"
        position="fixed"
        className={classes.root}
      >
        <List className={classes.root} display="flex" flexGrow={1}>
          <ListItem className={classes.boxroot}>
            <ListItemText id="switch-list-label-wifi" primary="Reddit" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("wifi")}
                checked={checked.indexOf("wifi") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText id="switch-list-label-amazon" primary="Amazon" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("bluetooth")}
                checked={checked.indexOf("bluetooth") !== -1}
                inputProps={{
                  "aria-labelledby": "switch-list-label-bluetooth",
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText id="switch-list-label-twitter" primary="twitter" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("twitter")}
                checked={checked.indexOf("twitter") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-twitter" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
