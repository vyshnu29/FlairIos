import ACTION from "../actions/actionTypes"
import initState from "./requestLetterState"

export function requestLetterReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.REQUEST_LETTER_REQUEST:
      return {
        ...state,
        isRequesting: true,
      }

    case ACTION.REQUEST_LETTER_SUCCESS:
      return {
        ...state,
        isRequesting: false,
      }

    case ACTION.REQUEST_LETTER_FAILURE:
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      }

    default:
      return state
  }
}
