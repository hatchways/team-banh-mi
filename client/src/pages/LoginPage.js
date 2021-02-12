import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

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

export default function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
              Welcome Back!
            </Typography>
            <Typography
              gutterBottom={true}
              align="center"
              variant="subtitle1"
              color="secondary"
              className={classes.marginBottom}
            >
              Login into your account
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item className={classes.fullWidth}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.roundedCorner}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    LOG IN
                  </Button>
                </Grid>
                <Grid item>
                  <Link to="/signup">Create Account</Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
