import ACTION from "../actions/actionTypes"
import initState from "./updatePermissionsState"

export function updatePermissionReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UPDATE_PERMISSIONS_REQUEST:
      return {
        ...state,
        isUpdating: true,
      }

    case ACTION.UPDATE_PERMISSIONS_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case ACTION.UPDATE_PERMISSIONS_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      }

    default:
      return state
  }
}
