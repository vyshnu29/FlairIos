import { combineReducers } from "redux"
import paymentsReducer from "./paymentsReducer"
import { paymentsHistoryReducer } from "./paymentsHistoryReducer"

const rootReducer = combineReducers({
  paymentsList: paymentsReducer,
  history: paymentsHistoryReducer,
})

export default rootReducer
