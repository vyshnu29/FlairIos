import ACTION from "../actions/actionTypes"
import initState from "./deleteLabelsState"

export function deleteLabelsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.DELETE_LABELS_REQUEST:
      return {
        ...state,
        isDeleting: true,
      }

    case ACTION.DELETE_LABELS_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      }

    case ACTION.DELETE_LABELS_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.error,
      }

    default:
      return state
  }
}
