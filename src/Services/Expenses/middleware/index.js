import axios from "axios"
import {
  createExpensesFailure,
  createExpensesSuccess,
  createExpensesRequest,
  updateExpensesRequest,
  updateExpensesSuccess,
  updateExpensesFailure,
  approveExpensesRequest,
  approveExpensesSuccess,
  approveExpensesFailure,
  rejectExpensesRequest,
  rejectExpensesSuccess,
  rejectExpensesFailure,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
export function submitExpenses(payload, empId, placementId, history) {
  return (dispatch) => {
    dispatch(createExpensesRequest())
    //
    const {
      additionalDetails,
      amount,
      departureDate,
      description,
      expenseType,
      receipt,
      returnDate,
      spentDate,
      vendor,
      attachmentDetails,
    } = payload
    waitingMsg("Creating Expenses...")
    axios
      .post(
        "employees/" + empId + "/placements/" + placementId + "/expenses/new",
        {
          additionalDetails,
          amount,
          departureDate,
          description,
          expenseType,
          receipt,
          returnDate,
          spentDate,
          vendor,
          attachmentDetails,
        }
      )
      .then((res) => {
        stopWaitMsg()
        history.push("/console/expenses/list")
         successMsg(res.data.message)
        dispatch(createExpensesSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(createExpensesFailure())
      })
  }
}
export function updateExpenses(
  payload,
  empId,
  placementId,
  expenseId,
  history
) {
  return (dispatch) => {
    dispatch(updateExpensesRequest())
    //
    const {
      additionalDetails,
      amount,
      departureDate,
      description,
      expenseType,
      receipt,
      returnDate,
      spentDate,
      vendor,
      attachmentDetails,
    } = payload
    waitingMsg("Updating Expenses...")
    axios
      .put(
        "employees/" +
          empId +
          "/placements/" +
          placementId +
          "/expenses/" +
          expenseId +
          "/update",
        {
          additionalDetails,
          amount,
          departureDate,
          description,
          expenseType,
          receipt,
          returnDate,
          spentDate,
          vendor,
          attachmentDetails,
        }
      )
      .then((res) => {
        stopWaitMsg()
        history.push("/console/expenses/list")
        successMsg(res.data.message)
        dispatch(updateExpensesSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(updateExpensesFailure())
      })
  }
}
export function approveExpenses(employeeId, placementId, expenseId) {
  return (dispatch) => {
    dispatch(approveExpensesRequest())
    console.log(employeeId, placementId, expenseId)

    waitingMsg("Approving Expense...")
    axios
      .put(
        "employees/" +
          employeeId +
          "/placements/" +
          placementId +
          "/expenses/" +
          expenseId +
          "/approve",
        {}
      )
      .then((res) => {
        stopWaitMsg()
        successMsg(res.data.message)
        dispatch(approveExpensesSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(approveExpensesFailure())
      })
  }
}
export function rejectExpenses(reason,employeeId, placementId, expenseId) {
  return (dispatch) => {
    dispatch(rejectExpensesRequest())
    console.log(reason,  employeeId, placementId, expenseId)

    waitingMsg("Rejected Expense...")
    axios
      .put(
        "employees/" +
          employeeId +
          "/placements/" +
          placementId +
          "/expenses/" +
          expenseId +
          "/reject",
        {
          reason,
        }
      )
      .then((res) => {
        stopWaitMsg()
        successMsg(res.data.message)
        dispatch(rejectExpensesSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(rejectExpensesFailure())
      })
  }
}