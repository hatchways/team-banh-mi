import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    label: 16,
    title: 32,
  },
  palette: {
    primary: {
      main: "#6583F2",
      dark: "#284097",
      light: "#94A8F5",
    },
    secondary: {
      main: "#FF9400",
    },
    background: {
      white: "#FFF",
      toggles: "#EAEEFD",
      light: "#FAFBFF",
    },
  },
});
