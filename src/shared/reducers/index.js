import { combineReducers } from "redux"
import { geoInfoReducer } from "./geoInfoReducer"

const rootReducer = combineReducers({
  geoInfo: geoInfoReducer,
})

export default rootReducer
