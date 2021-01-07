import { combineReducers } from "redux"
import { createExpenseReducer } from "./createExpenseReducer"
import { rejectExpenseReducer } from "./rejectExpenseReducer"
import { updateExpenseReducer } from "./updateExpenseReducer"
import { approveExpenseReducer } from "./approveExpenseReducer"
import expensesListReducer from "./expenseListReducer"
const rootReducer = combineReducers({
  rejectExpense: rejectExpenseReducer,
  updateExpense: updateExpenseReducer,
  createExpense: createExpenseReducer,
  approveExpense: approveExpenseReducer,
  expensesList: expensesListReducer,
})

export default rootReducer
