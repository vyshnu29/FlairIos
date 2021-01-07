import ACTION from "../actions/actionTypes"
import initState from "./addCommentState"

export function addCommentReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.NEW_COMMENTS_REQUEST:
      return {
        ...state,
        isCommenting: true,
      }

    case ACTION.NEW_COMMENTS_SUCCESS:
      return {
        ...state,
        isCommenting: false,
      }

    case ACTION.NEW_COMMENTS_FAILURE:
      return {
        ...state,
        isCommenting: false,
        error: action.error,
      }

    default:
      return state
  }
}
