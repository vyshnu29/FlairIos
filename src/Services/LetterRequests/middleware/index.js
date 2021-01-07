import axios from "axios"
import {
  requestLetterFailure,
  requestLetterRequest,
  requestLetterSuccess,
  rejectLetterRequestFailure,
  rejectLetterRequestRequest,
  rejectLetterRequestSuccess,
  approveLetterRequestFailure,
  approveLetterRequestRequest,
  approveLetterRequestSuccess,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
export function requestLetter(payload, history) {
  return (dispatch) => {
    dispatch(requestLetterRequest())
    console.log(payload)
    const { employeeID, type, data } = payload
    waitingMsg("Requesting a letter...")
    axios
      .post(
        `/letters/request?letterType=${type}&employeeID=${employeeID}`,
        data
      )
      .then((res) => {
        stopWaitMsg()
        history.push("/console/myrequests")
        successMsg(res.data.message)
        dispatch(requestLetterSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(requestLetterFailure())
      })
  }
}
export function rejectLetterRequest(description, employeeID, requestID) {
  return (dispatch) => {
    dispatch(rejectLetterRequestRequest())
    console.log(description, employeeID, requestID)

    waitingMsg("Rejecting Letter Request...")
    axios
      .put(`/letters/reject?employeeID=${employeeID}&requestID=${requestID}`, {
        description,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg(res.data.message)
        dispatch(rejectLetterRequestSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(rejectLetterRequestFailure())
      })
  }
}

export function approveLetterRequest(data, employeeID, requestID) {
  return (dispatch) => {
    dispatch(approveLetterRequestRequest())
    console.log(data, employeeID, requestID)

    waitingMsg("Approving Letter Request...")
    axios
      .put(
        `letters/approve?employeeID=${employeeID}&requestID=${requestID}`,
        data
      )
      .then((res) => {
        stopWaitMsg()
        successMsg(res.data.message)
        dispatch(approveLetterRequestSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.response.message)
        dispatch(approveLetterRequestFailure())
      })
  }
}