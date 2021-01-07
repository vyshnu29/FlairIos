import { combineReducers } from "redux"
import { companyDetailsReducer } from "./companyDetailsReducer"

const rootReducer = combineReducers({
  companyDetails: companyDetailsReducer,
})

export default rootReducer
