import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "...";

const ProtectedRoute = ({ children, ...rest }) => {
  // Check if the user is authenticated with the useContext hook.
  const { isAuthenticated } = useContext(AuthContext);
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
