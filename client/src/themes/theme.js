import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    label: 16,
  },
  palette: {
    primary: { main: "#FF3963" },
    background: {
      white: "#FFF",
      lightGray: "whitesmoke",
    },
    secondary: {
      main: "#FF9400",
    },
  },
});
