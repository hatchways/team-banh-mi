import * as actionTypes from "./actionTypes";

const UIInitialState = {
  loading: true,
  message: "",
  showSnack: false,
  error: false,
};

const signupAction = () => ({
  loading: true,
  message: "Registering user...",
  showSnack: false,
  error: false,
});

const signupSuccess = () => ({
  loading: false,
  message: "Sign up was successful",
  showSnack: true,
  error: false,
});

const signupError = (message) => ({
  loading: false,
  message,
  showSnack: true,
  error: true,
});

const loginAction = () => ({
  loading: true,
  message: "Login in...",
  showSnack: false,
  error: false,
});

const loginSuccess = () => ({
  loading: false,
  message: "Login was successful",
  showSnack: true,
  error: false,
});

const loginError = (message) => ({
  loading: false,
  message,
  showSnack: true,
  error: true,
});

const UIReducer = (state = UIInitialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_ACTION:
      return signupAction();
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess();
    case actionTypes.SIGNUP_ERROR:
      return signupError(action.payload);
    case actionTypes.LOGIN_ACTION:
      return loginAction();
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess();
    case actionTypes.LOGIN_ERROR:
      return loginError(action.payload);
    default:
      return state;
  }
};

export { UIReducer, UIInitialState };
