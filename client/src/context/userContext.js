import React, { createContext, useState } from "react";

export const UserContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = () => {
    setIsAuth(true);
  };

  const logoutHandler = () => {
    setIsAuth(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: isAuth,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
