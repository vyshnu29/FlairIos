import ACTION from "../actions/actionTypes"
import initState from "./linkTasksState"

export function createLabelsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.LINK_TASKS_REQUEST:
      return {
        ...state,
        isLinking: true,
      }

    case ACTION.LINK_TASKS_SUCCESS:
      return {
        ...state,
        isLinking: false,
      }

    case ACTION.LINK_TASKS_FAILURE:
      return {
        ...state,
        isLinking: false,
        error: action.error,
      }

    default:
      return state
  }
}
