import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    "margin-top": "5rem",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 50,
      },
    },
  },
  padding: {
    padding: "5rem",
    "padding-top": "3rem",
  },
  roundedCorner: {
    borderRadius: 50,
  },
  fullWidth: {
    width: "100%",
  },
  marginBottom: {
    "margin-bottom": "2rem",
  },
}));

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    company: "",
  });

  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        id="loginPage"
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} lg={4}>
          <Card className={classes.padding}>
            <Typography gutterBottom={true} align="center" variant="h4">
              Let's Get Started
            </Typography>
            <Typography
              gutterBottom={true}
              align="center"
              variant="subtitle1"
              color="secondary"
              className={classes.marginBottom}
            >
              Create an account
            </Typography>
            <form noValidate autoComplete="off">
              <Grid
                id="grid-form"
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid
                  item
                  id="grid-item-username"
                  className={classes.fullWidth}
                >
                  <TextField
                    id="emailInput"
                    label="Your email"
                    variant="outlined"
                    fullWidth={true}
                    value={user.username}
                    onChange={(event) =>
                      setUser({ ...user, username: event.target.value })
                    }
                  />
                </Grid>
                <Grid
                  item
                  id="grid-item-company-name"
                  className={classes.fullWidth}
                >
                  <TextField
                    id="company-input"
                    label="Company Name"
                    variant="outlined"
                    fullWidth={true}
                    value={user.company}
                    onChange={(event) =>
                      setUser({ ...user, company: event.target.value })
                    }
                  />
                </Grid>
                <Grid item className={classes.fullWidth}>
                  <TextField
                    className={classes.roundedCorner}
                    id="passwordInput"
                    label="Password"
                    variant="outlined"
                    fullWidth={true}
                    type="password"
                    value={user.password}
                    onChange={(event) =>
                      setUser({ ...user, password: event.target.value })
                    }
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.roundedCorner}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Create
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="/login">Login</Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
