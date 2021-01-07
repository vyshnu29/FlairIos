import React, { useState, useReducer } from 'react';
import handler from "./handler"

const Context = React.createContext();

const initialState = {
  type: "",
  approvedTimesheets: [],
  rejectedTimesheets: [],
  submittedTimesheets: [],
  defaulterTimesheets: [],
  isTableLoading: false,
  isFetchingTimesheets: true,
  timesheetSettings: {},
  isSettingsLoading: true,
  listAll: false,
  employeeID: ""
}

const ContextProvider = (props) => {
  const [state, handle] = useReducer(handler, initialState);
  return (
    <Context.Provider value={[state, handle]}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };