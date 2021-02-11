import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";
import DashBoard from "./pages/Dashboard";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={DashBoard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
