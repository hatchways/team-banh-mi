import React, { useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { theme } from "./themes/theme";

import {
  reducer as userReducer,
  initialState as userInitialState,
} from "./store/UserReducer";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export const UserContext = React.createContext();

function App() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  const loggedIn = userState.loggedIn;

  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider
        value={{ state: userState, dispatch: userDispatch }}
      >
        <BrowserRouter>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/dashboard" exact component={LoginPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
