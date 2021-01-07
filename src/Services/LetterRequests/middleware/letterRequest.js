import axios from "axios"
import {
  loadAllRequestLetterRequest,
  loadAllRequestLetterFailure,
  loadAllRequestLetterSuccess,
  loadIssuedRequestLetterFailure,
  loadIssuedRequestLetterRequest,
  loadIssuedRequestLetterSuccess,
  loadPendingRequestLetterFailure,
  loadPendingRequestLetterRequest,
  loadPendingRequestLetterSuccess,
  loadRejectedRequestLetterFailure,
  loadRejectedRequestLetterRequest,
  loadRejectedRequestLetterSuccess,
  htmlContentRequest,
  htmlContentFailure,
  htmlContentSuccess,
  unSubscribeListenerAction,
  setStateAction,
  setListener,
} from "../actions/actionCreators"
import { JSutils } from "../../../shared/JSutils"

import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import make_API_call from "../../../providers/REST_API"
import firestore from '@react-native-firebase/firestore'
export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const letterState = getState().letterRequests.letterRequestsList
  const unsubscribe = letterState[type].listener
  //unsubscribe()
  return dispatch(unSubscribeListenerAction({ type }))
}

export const loadAllRequestLetter = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadAllRequestLetterRequest())
  const { myReq, employeeId } = payload
  const subscribe = myReq
    ? firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadAllRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load All Letter Requests"
            errorMsg(msg)
            return dispatch(loadAllRequestLetterFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadAllRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load All Letter Requests"
            errorMsg(msg)
            return dispatch(loadAllRequestLetterFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "allLetterRequests"))
}
export const loadPendingRequestLetter = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadPendingRequestLetterRequest())
  const { myReq, employeeId } = payload
  const subscribe = myReq
    ? firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", false)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadPendingRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Pending Letter Requests"
            errorMsg(msg)
            return dispatch(loadPendingRequestLetterFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", false)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadPendingRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Pending Letter Requests"
            errorMsg(msg)
            return dispatch(loadPendingRequestLetterFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "pendingLetterRequests"))
}
export const loadRejectedRequestLetter = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadRejectedRequestLetterRequest())
  const { myReq, employeeId } = payload
  const subscribe = myReq
    ? firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", false)
        .where("isRejected", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadRejectedRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Rejeceted Letter Requests"
            errorMsg(msg)
            return dispatch(loadRejectedRequestLetterFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", false)
        .where("isRejected", "==", true)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadRejectedRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Rejeceted Letter Requests"
            errorMsg(msg)
            return dispatch(loadRejectedRequestLetterFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "rejectedLetterRequests"))
}
export const loadIssuedRequestLetter = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadIssuedRequestLetterRequest())
  const { myReq, employeeId } = payload
  const subscribe = myReq
    ? firestore()
        .collection("EMPLOYEES")
        .doc(employeeId)
        .collection("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", true)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadIssuedRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Issued Letter Requests"
            errorMsg(msg)
            return dispatch(loadIssuedRequestLetterFailure(msg))
          }
        )
    : firestore()
        .collectionGroup("LETTER_REQUESTS")
        .where("isExist", "==", true)
        .where("isApproved", "==", true)
        .where("isRejected", "==", false)
        .onSnapshot(
          (snap) => {
            const data = JSutils._array_to_object(
              snap.docs.map((doc) => doc.data()),
              "id"
            )
            return dispatch(loadIssuedRequestLetterSuccess(data))
          },
          (err) => {
            console.error(err)
            const msg = "Failed to load Issued Letter Requests"
            errorMsg(msg)
            return dispatch(loadIssuedRequestLetterFailure(msg))
          }
        )

  dispatch(setListener(subscribe, "issuedLetterRequests"))
}
export const requestHTMLContent = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(htmlContentRequest())
  const { employeeID, requestID, data } = payload
  console.log(payload)
  make_API_call(
    "post",
    `/letters/html?employeeID=${employeeID}&requestID=${requestID}`,
    data
  )
    .then((data) => {
      console.log(data)
      return dispatch(htmlContentSuccess(data.content))
    })
    .catch((err) => {
      console.error(err)
      return dispatch(htmlContentFailure(err))
    })
}
