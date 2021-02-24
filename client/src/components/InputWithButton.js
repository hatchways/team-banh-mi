import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 100,
    height: theme.spacing(7),
    paddingLeft: theme.spacing(1),
    paddingRight: 20,
    outline: "none",
    backgroundColor: theme.palette.background.white,
    marginBottom: theme.spacing(1),
    width: (props) => props.width,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const InputWithButton = (props) => {
  const styles = useStyles(props);
  const { root } = styles;
  const { ariaLabel, placeholder, width, value, onChange, children } = props;

  return (
    <OutlinedInput
      className={root}
      inputProps={{ "aria-label": ariaLabel }}
      placeholder={placeholder}
      value={value}
      width={width}
      onChange={onChange}
      endAdornment={<InputAdornment position="end">{children}</InputAdornment>}
    />
  );
};

export default InputWithButton;
