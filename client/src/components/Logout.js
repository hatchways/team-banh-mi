import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
// import { AuthContext } from '../'

const Logout = async () => {
  // const { logout } = useContext(AuthContext);

  await fetch("/auth/logout", {
    method: "POST",
  });

  // logout();

  return <Redirect to="/login" />;
};

export default Logout;
