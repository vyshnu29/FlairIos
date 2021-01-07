import ACTION from "../actions/actionTypes"
import initState from "./UpdateCommentsState"

export function updateCommentsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UPDATE_COMMENTS_REQUEST:
      return {
        ...state,
        isUpdating: true,
      }

    case ACTION.UPDATE_COMMENTS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case ACTION.UPDATE_COMMENTS_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      }

    default:
      return state
  }
}
