import { combineReducers } from "redux"
import { deductionListReducer } from "./deductionListReducer"
import { transactionListReducer } from "./transactionsListReducer"

const rootReducer = combineReducers({
  deductionList: deductionListReducer,
  transactionList: transactionListReducer,
})

export default rootReducer
