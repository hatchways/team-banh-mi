import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import Icon from "@material-ui/core/Icon";
import Switch from "@material-ui/core/Switch";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import 'font-awesome/css/font-awesome.min.css';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  drawer: {
    width: 360,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 360,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listContainer: {
    paddingBottom: 16,
    paddingTop: 16,
  }
}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 14,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(14px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#6583f2',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#6583f2',
      border: '3px solid #6583f2',
    },
  },
  thumb: {
    width: 12,
    height: 12,
  },
  track: {
    borderRadius: 16/2,
    backgroundColor: theme.palette.grey[500],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});



export default function Sidebar() {
  const classes = useStyles();

  

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => async() => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    console.log(newChecked,+""+currentIndex);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1); 
    }

    console.log(newChecked);

    const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("socialmedia", newChecked);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

    await fetch(
      "http://localhost:3001/socialmedia",
      requestOptions
    );
    setChecked(newChecked);
  };

  var socialMediaPlatforms = [
    {
      name:"Reddit",
      image:"fa fa-reddit-alien",
      color: "red"
    },
    {
      name:"Twitter",
      image:"fa fa-twitter",
      color:"#00a2f3"
    },
    {
      name:"Facebook",
      image:"fa fa-facebook-f",
      color:"#4064ac"
    },
    {
      name:"Amazon",
      image:"fa fa-amazon",
      color:"#222e3d"
    },
    {
      name:"Forbes",
      image:"fa fa-foursquare",
      color:"#33629a"
    },
    {
      name:"Shopify",
      image:"fa-shopify",
      color:""
    },
    {
      name:"Business Insider",
      image:"fab fa-bootstrap",
      color:""
    }];
  const createSocialMediaListItem = socialMediaPlatforms.map((list) => {
    return (<div><ListItem key={list.name}>
                  <ListItemAvatar>
          <Avatar style={{backgroundColor:list.color,fontSize:4}}>
          <Icon className={list.image} />
          </Avatar>
        </ListItemAvatar>
                  <ListItemIcon>
                  
                  </ListItemIcon>
              <ListItemText className={classes.listContainer} id={"switch-list-label-"+list.name} primary={list.name} />
              <ListItemSecondaryAction>
                <IOSSwitch key={list.name}
                  edge="end"
                  onChange={handleToggle(list.name)}
                  checked={checked.indexOf(list.name) !== -1}
                  inputProps={{ "aria-labelledby": "switch-list-label-"+list.name }}
                  color= "#6583f2"
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="middle"/>
            </div>
    )
  });

  return (
    <div className={classes.root} position="fixed">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List className={classes.root}>
        <div>{createSocialMediaListItem}</div>;
        </List>
        </div>
      </Drawer>
    </div>
  );
}