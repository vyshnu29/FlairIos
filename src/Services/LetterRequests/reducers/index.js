import { combineReducers } from "redux"
import { requestLetterReducer } from "./requestLetterReducer"
import letterRequestsListReducer from "./loadLetterRequestsReducer"
import { rejectLetterRequestsReducer } from "./rejectLetterRequestsReducer"
import { approveLetterRequestsReducer } from "./approveLetterRequestsReducer"


const rootReducer = combineReducers({
  requestLetter: requestLetterReducer,
  letterRequestsList: letterRequestsListReducer,
  rejectLetterRequest: rejectLetterRequestsReducer,
  approveLetterRequest: approveLetterRequestsReducer,
})


export default rootReducer
