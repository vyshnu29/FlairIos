import ACTION from "../actions/actionTypes"
import initState from "./createTasksState"

export function createTasksReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.CREATE_TASKS_REQUEST:
      return {
        ...state,
        isCreating: true,
      }

    case ACTION.CREATE_TASKS_SUCCESS:
      return {
        ...state,
        isCreating: false,
      }

    case ACTION.CREATE_TASKS_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      }

    default:
      return state
  }
}
