import React, { useState, useReducer } from 'react';
import handler from "./handler"

const Context = React.createContext();

const initialState = {
  type: "",
  placementID: "",
  employeeID: "",
  timesheetID: "",
  OTtime: [],
  standardTime: [],
  isCalendarLoaded: false,
  loadEntryTable: false,
  isSettingsLoaded: false,
  isPlacementsLoaded: false,
  dateRanges: [],
  selectedRange: [],
  cycles: [],
  isDocumentUploading: false,
  timesheetInfo: {
    startDate: "",
    endDate: "",
    attachmentDetails: {
      sourcePath: "",
      publicURL: "",
    },
  },
  timesheetSettings: {},
  placements: {},
  isSubmitting: false,
  isAlreadySubmitted: false
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