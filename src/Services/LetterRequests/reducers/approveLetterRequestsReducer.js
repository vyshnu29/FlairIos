import ACTION from "../actions/actionTypes"
import initState from "./approveLetterRequestsState"

export function approveLetterRequestsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.APPROVE_LETTER_REQUEST_REQUEST:
      return {
        ...state,
        isApproving: true,
      }

    case ACTION.APPROVE_LETTER_REQUEST_SUCCESS:
      return {
        ...state,
        isApproving: false,
      }

    case ACTION.APPROVE_LETTER_REQUEST_FAILURE:
      return {
        ...state,
        isApproving: false,
        error: action.error,
      }

    default:
      return state
  }
}
