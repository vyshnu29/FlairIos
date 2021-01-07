import ACTION from "../actions/actionTypes"
import initState from "./rejectExpenseState"

export function rejectExpenseReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.REJECT_EXPENSES_REQUEST:
      return {
        ...state,
        isRejecting: true,
      }

    case ACTION.REJECT_EXPENSES_SUCCESS:
      return {
        ...state,
        isRejecting: false,
      }

    case ACTION.REJECT_EXPENSES_FAILURE:
      return {
        ...state,
        isRejecting: false,
        error: action.error,
      }

    default:
      return state
  }
}
