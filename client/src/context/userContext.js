import React, { createContext, useReducer } from "react";
import { userReducer, userInitialState } from "../store/userReducer";

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserContextProvider;
