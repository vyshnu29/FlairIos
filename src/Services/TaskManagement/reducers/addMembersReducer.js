import ACTION from "../actions/actionTypes"
import initState from "./addMembersState"

export function addMemberReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.ADD_MEMBERS_REQUEST:
      return {
        ...state,
        isAdding: true,
      }

    case ACTION.ADD_MEMBERS_SUCCESS:
      return {
        ...state,
        isAdding: false,
      }

    case ACTION.ADD_MEMBERS_FAILURE:
      return {
        ...state,
        isAdding: false,
        error: action.error,
      }

    default:
      return state
  }
}
