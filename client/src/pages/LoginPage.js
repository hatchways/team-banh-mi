import React, { useContext, useReducer } from "react";
import Cookies from "js-cookie";
import Grid from "@material-ui/core/Grid";
import { Card, Snackbar, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert from "../components/Alert";
import { AuthContext } from "../context/authContext";
import { UserDispatchContext } from "../context/userContext";
import { reducer, initialState } from "../store/authUIReducer";
import * as actionTypes from "../store/actionTypes";

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
  const { vertical, horizontal } = { vertical: "bottom", horizontal: "center" };

  const userContext = useContext(AuthContext);
  const userDispatch = useContext(UserDispatchContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (user) => {
    dispatch({ type: "LOGIN_ACTION" });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", user.email);
      urlencoded.append("password", user.password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:3001/auth/login",
        requestOptions
      );
      const data = await response.json();
      userDispatch({
        type: actionTypes.UPDATE_COMPANY_NAME,
        companyName: data.companyName,
      });
      if (response.ok) {
        Cookies.set("x-auth-token", data.accessToken, { expires: 30 });
        dispatch({ type: "LOGIN_SUCCESS" });
        userContext.login();
      } else {
        userContext.logout();
        throw new Error("Error logging user");
      }
    } catch (e) {
      userContext.logout();
      dispatch({ type: "LOGIN_ERROR", payload: e.message });
    }
  };

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => login(values),
  });

  const handleClose = () => {
    // TODO
  };

  if (userContext.isAuthenticated) return <Redirect to="/dashboard" />;

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
              <Grid item id="grid-item-username" className={classes.fullWidth}>
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
                  LOG IN
                </Button>
              </Grid>
              <Grid item>
                <Link to="/signup" underline="none">
                  Create Account
                </Link>
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
