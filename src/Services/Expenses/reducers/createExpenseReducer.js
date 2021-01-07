import ACTION from "../actions/actionTypes"
import initState from "./createExpenseState"

export function createExpenseReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.CREATE_EXPENSES_REQUEST:
      return {
        ...state,
        isCreating: true,
      }

    case ACTION.CREATE_EXPENSES_SUCCESS:
      return {
        ...state,
        isCreating: false,
      }

    case ACTION.CREATE_EXPENSES_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      }

    default:
      return state
  }
}
