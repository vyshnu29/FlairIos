import { combineReducers } from "redux"
import { clientLocationsReducer } from "./clientLocationsReducer"
import { placementListReducer } from "./placementListReducer"

const rootReducer = combineReducers({
  placements: placementListReducer,
  clientlocations: clientLocationsReducer,
})

export default rootReducer
