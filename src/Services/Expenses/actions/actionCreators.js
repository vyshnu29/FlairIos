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

export function createExpensesRequest() {
  return {
    type: ACTION.CREATE_EXPENSES_REQUEST,
  }
}

export function createExpensesSuccess() {
  return {
    type: ACTION.CREATE_EXPENSES_SUCCESS,
  }
}

export function createExpensesFailure() {
  return {
    type: ACTION.CREATE_EXPENSES_FAILURE,
  }
}

export function updateExpensesRequest() {
  return {
    type: ACTION.UPDATE_EXPENSES_REQUEST,
  }
}

export function updateExpensesSuccess() {
  return {
    type: ACTION.UPDATE_EXPENSES_SUCCESS,
  }
}

export function updateExpensesFailure() {
  return {
    type: ACTION.UPDATE_EXPENSES_FAILURE,
  }
}

export function approveExpensesRequest() {
  return {
    type: ACTION.APPROVE_EXPENSES_REQUEST,
  }
}

export function approveExpensesSuccess() {
  return {
    type: ACTION.APPROVE_EXPENSES_SUCCESS,
  }
}

export function approveExpensesFailure() {
  return {
    type: ACTION.APPROVE_EXPENSES_FAILURE,
  }
}

export function rejectExpensesRequest() {
  return {
    type: ACTION.REJECT_EXPENSES_REQUEST,
  }
}

export function rejectExpensesSuccess() {
  return {
    type: ACTION.REJECT_EXPENSES_SUCCESS,
  }
}

export function rejectExpensesFailure() {
  return {
    type: ACTION.REJECT_EXPENSES_FAILURE,
  }
}

export function loadSubmittedExpensesRequest() {
  return {
    type: ACTION.LOAD_SUBMITTED_EXPENSES_REQUEST,
  }
}

export function loadSubmittedExpensesSuccess(payload) {
  return {
    type: ACTION.LOAD_SUBMITTED_EXPENSES_SUCCESS,
    payload,
  }
}

export function loadSubmittedExpensesFailure(payload) {
  return {
    type: ACTION.LOAD_SUBMITTED_EXPENSES_FAILURE,
    payload,
  }
}

export function loadRejectedExpensesRequest() {
  return {
    type: ACTION.LOAD_REJECTED_EXPENSES_REQUEST,
  }
}

export function loadRejectedExpensesSuccess(payload) {
  return {
    type: ACTION.LOAD_REJECTED_EXPENSES_SUCCESS,
    payload,
  }
}

export function loadRejectedExpensesFailure(payload) {
  return {
    type: ACTION.LOAD_REJECTED_EXPENSES_FAILURE,
    payload,
  }
}

export function loadApprovedExpensesRequest() {
  return {
    type: ACTION.LOAD_APPROVED_EXPENSES_REQUEST,
  }
}

export function loadApprovedExpensesSuccess(payload) {
  return {
    type: ACTION.LOAD_APPROVED_EXPENSES_SUCCESS,
    payload,
  }
}

export function loadApprovedExpensesFailure(payload) {
  return {
    type: ACTION.LOAD_APPROVED_EXPENSES_FAILURE,
    payload,
  }
}

export function loadMyExpensesRequest() {
  return {
    type: ACTION.LOAD_MY_EXPENSES_REQUEST,
  }
}

export function loadMyExpensesSuccess(payload) {
  return {
    type: ACTION.LOAD_MY_EXPENSES_SUCCESS,
    payload,
  }
}

export function loadMyExpensesFailure(payload) {
  return {
    type: ACTION.LOAD_MY_EXPENSES_FAILURE,
    payload,
  }
}