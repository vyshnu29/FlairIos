import ACTION from "../actions/actionTypes"
import initState from "./createLabelsState"

export function createLabelsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.CREATE_LABELS_REQUEST:
      return {
        ...state,
        isCreating: true,
      }

    case ACTION.CREATE_LABELS_SUCCESS:
      return {
        ...state,
        isCreating: false,
      }

    case ACTION.CREATE_LABELS_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      }

    default:
      return state
  }
}
