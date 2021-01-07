import { ACTION } from "./actionTypes"

export function countriesRequest() {
  return {
    type: ACTION.REQUEST_COUNTRIES,
  }
}

export function countriesReceived(payload) {
  return {
    type: ACTION.RECEIVE_COUNTRIES,
    payload,
  }
}

export function countriesError(err) {
  return {
    type: ACTION.ERROR_COUNTRIES,
    err,
  }
}

export function statesRequest() {
  return {
    type: ACTION.RECEIVE_STATES,
  }
}

export function statesReceived(payload) {
  return {
    type: ACTION.RECEIVE_STATES,
    payload,
  }
}

export function statesError(err) {
  return {
    type: ACTION.ERROR_STATES,
    err,
  }
}
