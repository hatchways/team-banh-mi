import React from "react";
import { MuiThemeProvider, Paper } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  page: {
    display: "flex",
    "flex-grow": 1,
  },
}));

function App() {
  const loggedIn = false;
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
              </Route>
              <Route path="/dashboard" exact component={LandingPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/signup" exact component={SignupPage} />
            </BrowserRouter>
    </MuiThemeProvider>
  );

  // return (
  //   <MuiThemeProvider theme={theme}>
  //     <Paper>
  //       <Grid container direction="column" className={classes.root}>
  //         <Grid item></Grid>
  //         <Grid className={classes.page}>
  //           <BrowserRouter>
  //             <Route exact path="/">
  //               {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
  //             </Route>
  //             <Route path="/dashboard" exact component={LandingPage} />
  //             <Route path="/login" exact component={LoginPage} />
  //           </BrowserRouter>
  //         </Grid>
  //       </Grid>
  //     </Paper>
  //   </MuiThemeProvider>
  // );
}

export default App;
