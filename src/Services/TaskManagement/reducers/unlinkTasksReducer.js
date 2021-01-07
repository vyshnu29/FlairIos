import ACTION from "../actions/actionTypes"
import initState from "./unlinkTasksState"

export function createLabelsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UNLINK_TASKS_REQUEST:
      return {
        ...state,
        isUnLinking: true,
      }

    case ACTION.UNLINK_TASKS_SUCCESS:
      return {
        ...state,
        isUnLinking: false,
      }

    case ACTION.UNLINK_TASKS_FAILURE:
      return {
        ...state,
        isUnLinking: false,
        error: action.error,
      }

    default:
      return state
  }
}
