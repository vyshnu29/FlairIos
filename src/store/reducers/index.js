import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore"
import ACTIONS from "../../Services/Authentication/actions/actionTypes"
import { firebaseReducer } from "react-redux-firebase"
import AuthReducer from '../../Services/Authentication/reducers/index'
import taskManagementReducer from "../../Services/TaskManagement/reducers"
import placementReducer from "../../Services/Placements/reducers"
import clientReducer from "../../Services/Clients/reducers"
import timesheetReducer from "../../Services/Timesheets/reducers"
import employeeReducer from '../../Services/EmployeeManagment/reducers/index'
import wikiReducer from "../../Services/Wiki/reducers"
import sharedReducer from "../../shared/reducers"
import deductionReducer from "../../Services/Deductions/reducers"
import payrollReducer from "../../Services/Payrolls/reducers"
import paymentsReducer from "../../Services/Payments/reducers"
import expensesReducer from "../../Services/Expenses/reducers"
import invoiceReducer from "../../Services/Invoices/reducers"
import letterRequestReducer from "../../Services/LetterRequests/reducers"
const appReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: AuthReducer,
  placement: placementReducer,
  client: clientReducer,
  shared: sharedReducer,
  employee: employeeReducer,
  projects: taskManagementReducer,
  timesheets: timesheetReducer,
  invoice: invoiceReducer,
  payments: paymentsReducer,
  expenses: expensesReducer,
  wiki: wikiReducer,
  payrolls: payrollReducer,
  deductions: deductionReducer,
  letterRequests: letterRequestReducer,
})

const rootReducer = (state, action) => {
  if (action.type === ACTIONS.SIGNOUT_SUCCESS) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer