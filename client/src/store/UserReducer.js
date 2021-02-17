const initialState = {
  loading: true,
  message: "",
  showSnack: false,
  error: false,
  user: {
    loggedIn: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_ACTION":
      return {
        loading: true,
        message: "Registering user...",
        showSnack: false,
        user: {
          loggedIn: false,
        },
        error: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        loading: false,
        message: "Sign up was successful",
        showSnack: true,
        user: { ...action.payload, loggedIn: true },
        error: false,
      };
    case "SIGNUP_ERROR":
      return {
        loading: false,
        message: action.payload,
        showSnack: true,
        user: { loggedIn: false },
        error: true,
      };
    case "LOGIN_ACTION":
      return {
        loading: true,
        message: "Login in...",
        showSnack: false,
        user: {
          loggedIn: false,
        },
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        message: "Login was successful",
        showSnack: true,
        user: { ...action.payload, loggedIn: true },
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        loading: false,
        message: action.payload,
        showSnack: true,
        user: { loggedIn: false },
        error: true,
      };
    default:
      return {
        loading: false,
        message: state.message,
        showSnack: false,
        user: { ...state.user },
        error: state.error,
      };
  }
};

export { reducer, initialState };
