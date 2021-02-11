import { createMuiTheme } from "@material-ui/core";
import {lightBlue} from '@material-ui/core/colors';


export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: { main: "#DF1B1B" },
    secondary: lightBlue,

  },
});
