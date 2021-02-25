import React, { createContext, useState } from "react";
import { Redirect } from "react-router-dom";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => setIsAuth(true);

  const logoutHandler = async () => {
    await fetch("/auth/logout", { method: "POST" });
    setIsAuth(false);
    return <Redirect to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuth,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
