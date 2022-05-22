import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

//create data layer
//higher order component----------V---------V-------------V
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull info from data layer
export const useStateValue = () => useContext(StateContext);
