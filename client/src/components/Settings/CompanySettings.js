import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import Input from "../Input";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "whitesmoke",
    height: "100vh",
    width: "auto",
    padding: theme.spacing(6),
    paddingLeft: theme.spacing(12),
  },

  subContainer: {
    marginBottom: theme.spacing(6),
  },

  label: {
    marginRight: theme.spacing(4),
    width: "max-content",
    fontSize: theme.typography.label,
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: theme.spacing(2),
  },

  buttonSmall: {
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: 100,
    marginRight: -9,
    width: theme.spacing(11),
    height: theme.spacing(5),
  },

  buttonAdd: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.white,
  },

  buttonRemove: {
    backgroundColor: theme.palette.background.lighGray,
    color: theme.palette.primary.light,
  },

  buttonSave: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 16,
    color: theme.palette.background.white,
    width: theme.spacing(20),
    height: theme.spacing(8),
    borderRadius: 100,
  },
}));

function CompanySettings(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container className={classes.subContainer}>
        <Grid item container xs={3} justify="flex-end">
          <Typography className={classes.label}>Your company</Typography>
        </Grid>
        <Grid item container xs={6} justify="flex-start">
          <Input width={500} value="CompanyABC">
            <Button
              variant="contained"
              disableElevation
              className={`${classes.buttonSmall} ${classes.buttonRemove}`}
            >
              Remove
            </Button>
          </Input>
          <Input width={500} placeholder="Company name">
            <Button
              variant="contained"
              disableElevation
              className={`${classes.buttonSmall} ${classes.buttonAdd}`}
            >
              Add
            </Button>
          </Input>
        </Grid>
      </Grid>
      <Grid item container className={classes.subContainer}>
        <Grid item container xs={3} justify="flex-end">
          <Typography className={classes.label}>Weekly report</Typography>
        </Grid>
        <Grid item container xs={6} justify="flex-start">
          <Input width={500} value="yourcompany@email.com" />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={3}
        justify="flex-end"
        className={classes.subContainer}
      >
        <Button
          variant="contained"
          disableElevation
          className={classes.buttonSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default CompanySettings;
