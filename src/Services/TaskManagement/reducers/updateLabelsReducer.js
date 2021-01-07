import ACTION from "../actions/actionTypes"
import initState from "./updateLabelsState"

export function updateLabelsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UPDATE_LABELS_REQUEST:
      return {
        ...state,
        isUpdating: true,
      }

    case ACTION.UPDATE_LABELS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case ACTION.UPDATE_LABELS_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      }

    default:
      return state
  }
}
