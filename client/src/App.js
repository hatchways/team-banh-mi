import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContextProvider from "./context/authContext";
import UserContextProvider from "./context/userContext";
import { theme } from "./themes/theme";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <ProtectedRoute path="/" exact component={Dashboard} />
            <ProtectedRoute path="/dashboard" exact component={Dashboard} />
            <ProtectedRoute path="/settings" exact component={Settings} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
          </BrowserRouter>
        </UserContextProvider>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
