import { combineReducers } from "redux"
import payrollListReducer from "./payrollList"

const rootReducer = combineReducers({
  payrollList: payrollListReducer,
})

export default rootReducer
