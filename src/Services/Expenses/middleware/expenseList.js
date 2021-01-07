import axios from "axios"
import {
  loadApprovedExpensesFailure,
  loadApprovedExpensesRequest,
  loadApprovedExpensesSuccess,
  loadMyExpensesFailure,
  loadMyExpensesRequest,
  loadMyExpensesSuccess,
  loadRejectedExpensesFailure,
  loadRejectedExpensesRequest,
  loadRejectedExpensesSuccess,
  loadSubmittedExpensesFailure,
  loadSubmittedExpensesRequest,
  loadSubmittedExpensesSuccess,
  setListener,
  setStateAction,
  unSubscribeListenerAction,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import { JSutils } from "../../../shared/JSutils"
import make_API_call from "../../../providers/REST_API"
import firestore from '@react-native-firebase/firestore'


export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const expensesState = getState().expenses.expensesList
  const unsubscribe = expensesState[type].listener
 // unsubscribe()
  return dispatch(unSubscribeListenerAction({ type }))
}
export const loadSubmittedExpenses = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const { individual, employeeId } = payload
  console.log(payload)
  dispatch(loadSubmittedExpensesRequest())
  const subscribe = individual
    ?    firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("EXPENSES")
        .where("isApproved", "==", false)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadSubmittedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load submiteed Expenses"
            errorMsg(msg)
            return dispatch(loadSubmittedExpensesFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("EXPENSES")
        .where("isApproved", "==", false)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadSubmittedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load submiteed Expenses"
            errorMsg(msg)
            return dispatch(loadSubmittedExpensesFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "submittedExpenses"))
}

export const loadApprovedExpenses = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const { individual, employeeId } = payload
  dispatch(loadApprovedExpensesRequest())
  const subscribe = individual
    ? 
          firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("EXPENSES")
        .where("isApproved", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadApprovedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Approved Expenses"
            errorMsg(msg)
            return dispatch(loadApprovedExpensesFailure(msg))
          }
        )
    : 
        firestore()
        .collectionGroup("EXPENSES")
        .where("isApproved", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadApprovedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Approved Expenses"
            errorMsg(msg)
            return dispatch(loadApprovedExpensesFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "approvedExpenses"))
}

export const loadRejectedExpenses = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const { individual, employeeId } = payload
  dispatch(loadRejectedExpensesRequest())
  const subscribe = individual
    ?   firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("EXPENSES")
        .where("isRejected", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadRejectedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Approved Expenses"
            errorMsg(msg)
            return dispatch(loadRejectedExpensesFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("EXPENSES")
        .where("isRejected", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadRejectedExpensesSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Rejected Expenses"
            errorMsg(msg)
            return dispatch(loadRejectedExpensesFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "rejectedExpenses"))
}

export const loadMyExpenses = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const { individual, employeeId } = payload
  dispatch(loadMyExpensesRequest())
  const subscribe = 
      firestore()
    .collection("EMPLOYEES")
    .doc(employeeId)
    .collection("EXPENSES")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadMyExpensesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load My Expenses"
        errorMsg(msg)
        return dispatch(loadMyExpensesFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "myExpenses"))
}
