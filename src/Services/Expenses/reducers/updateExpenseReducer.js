import ACTION from "../actions/actionTypes"
import initState from "./updateExpenseState"

export function updateExpenseReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.UPDATE_EXPENSES_REQUEST:
      return {
        ...state,
        isUpdating: true,
      }

    case ACTION.UPDATE_EXPENSES_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case ACTION.UPDATE_EXPENSES_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error,
      }

    default:
      return state
  }
}
