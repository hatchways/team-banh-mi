import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
        </BrowserRouter>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
