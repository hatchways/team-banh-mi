import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => setIsAuth(true);

  const logoutHandler = () => setIsAuth(false);

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
