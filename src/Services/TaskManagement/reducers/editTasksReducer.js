import ACTION from "../actions/actionTypes"
import initState from "./editTasksState"

export function editTasksReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.EDIT_TASKS_REQUEST:
      return {
        ...state,
        isEditing: true,
      }

    case ACTION.EDIT_TASKS_SUCCESS:
      return {
        ...state,
        isEditing: false,
      }

    case ACTION.EDIT_TASKS_FAILURE:
      return {
        ...state,
        isEditing: false,
        error: action.error,
      }

    default:
      return state
  }
}
