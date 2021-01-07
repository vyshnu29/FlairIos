import ACTION from "../actions/actionTypes"
import initState from "./updateProjectState"

export function updateProjectReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isUpdating: true,
      }

    case ACTION.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case ACTION.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      }

    default:
      return state
  }
}
