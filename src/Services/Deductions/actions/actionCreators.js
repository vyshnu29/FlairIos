import { ACTION } from "./actionTypes"

export function deductionsRequest() {
  return {
    type: ACTION.DEDUCTIONLIST_REQUEST,
  }
}

export function deductionsSuccess(payload) {
  return {
    type: ACTION.DEDUCTIONLIST_SUCCESS,
    payload,
  }
}

export function deductionsError(err) {
  return {
    type: ACTION.DEDUCTIONLIST_ERROR,
    err,
  }
}

export function transactionsRequest() {
  return {
    type: ACTION.TRANSACTIONLIST_REQUEST,
  }
}

export function transactionsSuccess(payload) {
  return {
    type: ACTION.TRANSACTIONLIST_SUCCESS,
    payload,
  }
}

export function transactionsError(err) {
  return {
    type: ACTION.TRANSACTIONLIST_ERROR,
    err,
  }
}
