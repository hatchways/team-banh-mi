import React, { createContext, useReducer, useState } from "react";
import { userReducer } from "../store/userReducer";

export const UserContext = createContext({
  id: "",
  setId: () => {},
  userDispatch: () => {},
});

const UserContextProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [_, userDispatch] = useReducer(userReducer);
  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
