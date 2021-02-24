import React from "react";
import PropTypes from "prop-types";
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

const Input = (props) => {
  const styles = useStyles(props);
  const { root } = styles;
  const { ariaLabel, placeholder, width, value, onChange, children } = props;

  if (children)
    return (
      <OutlinedInput
        className={root}
        inputProps={{ "aria-label": ariaLabel }}
        placeholder={placeholder}
        value={value}
        width={width}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">{children}</InputAdornment>
        }
      />
    );
  else
    return (
      <OutlinedInput
        className={root}
        inputProps={{ "aria-label": ariaLabel }}
        placeholder={placeholder}
        value={value}
        width={width}
        onChange={onChange}
      />
    );
};

Input.propTypes = {
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.element,
};

export default Input;
