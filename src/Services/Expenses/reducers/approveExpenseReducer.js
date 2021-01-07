import ACTION from "../actions/actionTypes"
import initState from "./approveExpenseState"

export function approveExpenseReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.APPROVE_EXPENSES_REQUEST:
      return {
        ...state,
        isApproving: true,
      }

    case ACTION.APPROVE_EXPENSES_SUCCESS:
      return {
        ...state,
        isApproving: false,
      }

    case ACTION.APPROVE_EXPENSES_FAILURE:
      return {
        ...state,
        isApproving: false,
        error: action.error,
      }

    default:
      return state
  }
}
