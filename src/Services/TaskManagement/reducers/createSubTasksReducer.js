import ACTION from "../actions/actionTypes"
import initState from "./createSubTasksState"

export function createSubTasksReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.NEW_SUBTASKS_REQUEST:
      return {
        ...state,
        isCreating: true,
      }

    case ACTION.NEW_SUBTASKS_SUCCESS:
      return {
        ...state,
        isCreating: false,
      }

    case ACTION.NEW_SUBTASKS_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      }

    default:
      return state
  }
}
