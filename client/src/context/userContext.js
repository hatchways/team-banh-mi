import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../store/userReducer";

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserContextProvider;
