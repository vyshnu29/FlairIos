import { combineReducers } from "redux"
import timesheetReducer from "./timesheetReducer"
const rootReducer = combineReducers({
  info: timesheetReducer,
})

export default rootReducer
