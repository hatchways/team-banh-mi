import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { authContext } from "...";

const ProtectedRoute = ({ children, ...rest }) => {
  // Check if the user is authenticated with the useContext hook.
  const { isAuthenticated, checkValidToken } = useContext(authContext);

  // checkValidToken()

  return (
    <Route
      {...rest}
      render={() => {
        if (!isAuthenticated) return <Redirect to="/login" />;
        return children;
      }}
    />
  );
};

export default ProtectedRoute;
