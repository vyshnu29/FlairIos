import ACTION from "../actions/actionTypes"
import initState from "./deleteCommentsState"

export function deleteCommentsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.DELETE_COMMENTS_REQUEST:
      return {
        ...state,
        isDeleting: true,
      }

    case ACTION.DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      }

    case ACTION.DELETE_COMMENTS_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.error,
      }

    default:
      return state
  }
}
