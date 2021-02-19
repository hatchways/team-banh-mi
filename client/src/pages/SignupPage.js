import React, { useContext } from "react";
import Cookies from "js-cookie";
import Grid from "@material-ui/core/Grid";
import { Card, TextField, Snackbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert from "../components/Alert";
import { UserContext } from "../App";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  company: yup
    .string("Enter your company name")
    .min(8, "Company name should be of minimum 8 characters length")
    .required("Company name is required"),
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

export default function SignupPage() {
  const { vertical, horizontal } = { vertical: "bottom", horizontal: "center" };

  const { state, dispatch } = useContext(UserContext);

  const signup = async (user) => {
    dispatch({ type: "SIGNUP_ACTION" });
    //async login operation
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", user.email);
      urlencoded.append("companyName", user.company);
      urlencoded.append("password", user.password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:3001/auth/register",
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        Cookies.set("x-auth-token", data.accessToken);
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: { email: user.email },
        });
      } else {
        throw new Error("Error registering user");
      }
    } catch (e) {
      dispatch({ type: "SIGNUP_ERROR", payload: e.message });
    }
  };

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      company: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => signup(values),
  });

  const handleClose = () => {
    console.log("Snackbar gone");
  };

  if (state.user.loggedIn) return <Redirect to="/dashboard" />;

  return (
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
          <form onSubmit={formik.handleSubmit}>
            <Grid
              id="grid-form"
              container
              direction="column"
              alignItems="center"
              spacing={2}
            >
              <Grid item id="grid-item-username" className={classes.fullWidth}>
                <TextField
                  id="email"
                  name="email"
                  label="Your email"
                  variant="outlined"
                  fullWidth={true}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid
                item
                id="grid-item-company-name"
                className={classes.fullWidth}
              >
                <TextField
                  id="company"
                  name="company"
                  label="Company Name"
                  variant="outlined"
                  fullWidth={true}
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.company && Boolean(formik.errors.company)
                  }
                  helperText={formik.touched.company && formik.errors.company}
                />
              </Grid>
              <Grid item className={classes.fullWidth}>
                <TextField
                  className={classes.roundedCorner}
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.showSnack}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={state.error ? "error" : "success"}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
