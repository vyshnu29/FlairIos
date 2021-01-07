import { combineReducers } from "redux"
import { geoStateReducer } from "./geoLocationReducer"
import { newClientReducer } from "./newClientReducer"

const rootReducer = combineReducers({
  newClient: newClientReducer,
  geo_info: geoStateReducer,
})

export default rootReducer
