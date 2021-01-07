import axios from "axios"
import {
  loadAllEmployeesRequest,
  loadAllEmployeesFailure,
  loadAllEmployeesSuccess,
  loadActiveEmployeesFailure,
  loadActiveEmployeesRequest,
  loadActiveEmployeesSuccess,
  loadInActiveEmployeesFailure,
  loadInActiveEmployeesRequest,
  loadInActiveEmployeesSuccess,
  loadSuspendedEmployeesRequest,
  loadSuspendedEmployeesFailure,
  loadSuspendedEmployeesSuccess,
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
import firestore from '@react-native-firebase/firestore';
import make_API_call from "../../../providers/REST_API"

export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const employeeListState = getState().employee.employeeList
  const unsubscribe = employeeListState[type].listener
 // unsubscribe()
  return dispatch(unSubscribeListenerAction({ type }))
}
export const loadAllEmployees = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadAllEmployeesRequest())
  const subscribe = getFirebase()
    firestore()
    .collection("EMPLOYEES")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "email"
        )
        return dispatch(loadAllEmployeesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load All Employees"
        errorMsg(msg)
        return dispatch(loadAllEmployeesFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "allEmployees"))
}

export const loadActiveEmployees = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadActiveEmployeesRequest())
  const subscribe = getFirebase()
    firestore()
    .collection("EMPLOYEES")
    .where("status", "==", "active")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "uid"
        )
        return dispatch(loadActiveEmployeesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load Active Employees"
        errorMsg(msg)
        return dispatch(loadActiveEmployeesFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "activeEmployees"))
}

export const loadInActiveEmployees = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadInActiveEmployeesRequest())
  const subscribe = getFirebase()
    firestore()
    .collection("EMPLOYEES")
    .where("status", "==", "inactive")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "email"
        )
        return dispatch(loadInActiveEmployeesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load InActive Employees"
        errorMsg(msg)
        return dispatch(loadInActiveEmployeesFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "inActiveEmployees"))
}

export const loadSuspendedEmployees = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadSuspendedEmployeesRequest())
  const subscribe = getFirebase()
    firestore()
    .collection("EMPLOYEES")
    .where("status", "==", "suspended")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "email"
        )
        return dispatch(loadSuspendedEmployeesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load Suspended Employees"
        errorMsg(msg)
        return dispatch(loadSuspendedEmployeesFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "suspendedEmployees"))
}
