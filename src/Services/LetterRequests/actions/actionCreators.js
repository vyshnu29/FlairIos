import ACTION from "./actionTypes"


export const setStateAction = (payload) => ({
  type: ACTION.SET_STATE,
  payload,
})

export const setListener = (listener, type) => ({
  type: ACTION.SET_LISTENER,
  payload: {
    listener,
    type,
  },
})
export const unSubscribeListenerAction = (payload) => ({
  type: ACTION.UNSUBSCRIBE_LISTENER,
  payload,
})

export function requestLetterRequest() {
  return {
    type: ACTION.REQUEST_LETTER_REQUEST,
  }
}

export function requestLetterSuccess(payload) {
  return {
    type: ACTION.REQUEST_LETTER_SUCCESS,
    payload,
  }
}

export function requestLetterFailure(payload) {
  return {
    type: ACTION.REQUEST_LETTER_FAILURE,
    payload,
  }
}

export function loadAllRequestLetterRequest() {
  return {
    type: ACTION.LOAD_ALL_REQUEST_LETTER_REQUEST,
  }
}

export function loadAllRequestLetterSuccess(payload) {
  return {
    type: ACTION.LOAD_ALL_REQUEST_LETTER_SUCCESS,
    payload,
  }
}

export function loadAllRequestLetterFailure(payload) {
  return {
    type: ACTION.LOAD_ALL_REQUEST_LETTER_FAILURE,
    payload,
  }
}

export function loadPendingRequestLetterRequest() {
  return {
    type: ACTION.LOAD_PENDING_REQUEST_LETTER_REQUEST,
  }
}

export function loadPendingRequestLetterSuccess(payload) {
  return {
    type: ACTION.LOAD_PENDING_REQUEST_LETTER_SUCCESS,
    payload,
  }
}

export function loadPendingRequestLetterFailure(payload) {
  return {
    type: ACTION.LOAD_PENDING_REQUEST_LETTER_FAILURE,
    payload,
  }
}

export function loadRejectedRequestLetterRequest() {
  return {
    type: ACTION.LOAD_REJECTED_REQUEST_LETTER_REQUEST,
  }
}

export function loadRejectedRequestLetterSuccess(payload) {
  return {
    type: ACTION.LOAD_REJECTED_REQUEST_LETTER_SUCCESS,
    payload,
  }
}

export function loadRejectedRequestLetterFailure(payload) {
  return {
    type: ACTION.LOAD_REJECTED_REQUEST_LETTER_FAILURE,
    payload,
  }
}

export function loadIssuedRequestLetterRequest() {
  return {
    type: ACTION.LOAD_ISSUED_REQUEST_LETTER_REQUEST,
  }
}

export function loadIssuedRequestLetterSuccess(payload) {
  return {
    type: ACTION.LOAD_ISSUED_REQUEST_LETTER_SUCCESS,
    payload,
  }
}

export function loadIssuedRequestLetterFailure(payload) {
  return {
    type: ACTION.LOAD_ISSUED_REQUEST_LETTER_FAILURE,
    payload,
  }
}
export function htmlContentRequest() {
  return {
    type: ACTION.HTML_CONTENT_REQUEST,
  }
}

export function htmlContentSuccess(payload) {
  return {
    type: ACTION.HTML_CONTENT_SUCCESS,
    payload,
  }
}

export function htmlContentFailure(payload) {
  return {
    type: ACTION.HTML_CONTENT_FAILURE,
    payload,
  }
}
export function rejectLetterRequestRequest() {
  return {
    type: ACTION.REJECT_LETTER_REQUEST_REQUEST,
  }
}

export function rejectLetterRequestSuccess() {
  return {
    type: ACTION.REJECT_LETTER_REQUEST_SUCCESS,
  }
}

export function rejectLetterRequestFailure() {
  return {
    type: ACTION.REJECT_LETTER_REQUEST_FAILURE,
  }
}
export function approveLetterRequestRequest() {
  return {
    type: ACTION.APPROVE_LETTER_REQUEST_REQUEST,
  }
}

export function approveLetterRequestSuccess() {
  return {
    type: ACTION.APPROVE_LETTER_REQUEST_SUCCESS,
  }
}

export function approveLetterRequestFailure() {
  return {
    type: ACTION.APPROVE_LETTER_REQUEST_FAILURE,
  }
}