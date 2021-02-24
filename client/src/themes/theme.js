import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    label: 16,
  },
  palette: {
    primary: {
      main: "#6583F2",
      dark: "#284097",
      light: "#94A8F5",
    },
    background: {
      white: "#FFF",
      lightGray: "whitesmoke",
    },
  },
});
