import React, { useState, useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Spinner from './Spinner';
import { AuthContext } from "../context/authContext";
import Cookie from "js-cookie";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        if (!isTokenValid) throw new Error("Token was invalid");
      } catch (error) {
        Cookie.remove("x-auth-token");
        logout();
        setLoading(false);
        console.error(error);
      }
    };
    checkTokenValidity();
  }, [login, logout, setLoading]);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (loading) return <Spinner />
        if (!isAuthenticated && !loading) return <Redirect to="/login" />;
        return <Comp {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
