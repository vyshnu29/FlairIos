import ACTION from "../actions/actionTypes"
import initState from "./rejectLetterRequestsState"

export function rejectLetterRequestsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.REJECT_LETTER_REQUEST_REQUEST:
      return {
        ...state,
        isRejecting: true,
      }

    case ACTION.REJECT_LETTER_REQUEST_SUCCESS:
      return {
        ...state,
        isRejecting: false,
      }

    case ACTION.REJECT_LETTER_REQUEST_FAILURE:
      return {
        ...state,
        isRejecting: false,
        error: action.error,
      }

    default:
      return state
  }
}
