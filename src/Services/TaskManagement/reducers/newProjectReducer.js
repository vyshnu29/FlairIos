import ACTION from "../actions/actionTypes"
import initState from "./newProjectState"

export function newProjectReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.NEW_PROJECT_REQUEST:
      return {
        ...state,
        isCreating: true,
      }

    case ACTION.NEW_PROJECT_SUCCESS:
      return {
        ...state,
        isCreating: false,
      }

    case ACTION.NEW_PROJECT_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      }

    default:
      return state
  }
}
