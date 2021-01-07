import ACTION from "../actions/actionTypes"
import initState from "./removeMemberState"

export function removeMemberReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.REMOVE_MEMBER_REQUEST:
      return {
        ...state,
        isRenoving: true,
      }

    case ACTION.REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        isRenoving: false,
      }

    case ACTION.REMOVE_MEMBER_FAILURE:
      return {
        ...state,
        isRenoving: false,
        error: action.error,
      }

    default:
      return state
  }
}
