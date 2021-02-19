import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookie from "js-cookie";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const cookie = Cookie.get("x-auth-token");
        if (!cookie) throw new Error("No valid cookie");
        const urlencoded = new URLSearchParams();
        urlencoded.append("token", cookie);
        const response = await fetch("/auth/checkAuth", {
          method: "POST",
          credentials: "same-origin",
          body: urlencoded,
        });
        const isTokenValid = await response.json();
        if (isTokenValid) login();
        if (!isTokenValid) throw new Error("Token was invalid");
      } catch (error) {
        Cookie.remove("x-auth-token");
        logout();
        console.error(error);
      }
    };
    checkTokenValidity();
  }, [login, logout]);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/login" />;
        return <Comp {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
