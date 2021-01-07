import {
  errorMsg,
  waitingMsg,
  stopWaitMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import make_rest_API_call from "../../../providers/REST_API"
import {
  deductionsRequest,
  deductionsSuccess,
  deductionsError,
  transactionsError,
  transactionsSuccess,
  transactionsRequest,
} from "../actions/actionCreators"

export const getTransactions = (employeeID, deductionId) => {
  return (dispatch) => {
    dispatch(transactionsRequest())
    make_rest_API_call(
      "get",
      `deductions/transactions/${employeeID}/${deductionId}`
    )
      .then((data) => {
        dispatch(transactionsSuccess(data.transactions))
      })
      .catch((err) => {
        errorMsg(err.message)
        dispatch(transactionsError(err))
      })
  }
}

export const newDeduction = (payload, employeeID, callback) => {
  return () => {
    waitingMsg("Creating deduction...")
    make_rest_API_call("post", `deductions/newDeduction/${employeeID}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
        callback()
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const updateDeduction = (payload, deductionId, employeeID) => {
  return () => {
    waitingMsg("Updating deduction...")
    make_rest_API_call(
      "put",
      `deductions/updateDeduction/${deductionId}/${employeeID}`,
      payload
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const getDeductionList = (employeeID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    dispatch(deductionsRequest())
    firebase
      .firestore()
      .collectionGroup("DEDUCTIONS")
      .where("employeeID", "==", employeeID)
      .where("isExist", "==", true)
      .get()
      .then((snap) => {
        const deductionList = snap.docs.map((doc) => doc.data())
        dispatch(deductionsSuccess(deductionList))
      })
      .catch((err) => {
        console.error(err)
        dispatch(deductionsError(err))
      })
  }
}
