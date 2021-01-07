import { ACTION } from "../actions/actionTypes"
import initState from "./paymentsHistoryState"

export function paymentsHistoryReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.LOAD_INVOICE_PAYMENTS_HISTORY_REQ:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
        error: null,
        payments_history: [],
      }

    case ACTION.LOAD_INVOICE_PAYMENTS_HISTORY_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        payments_history: action.payload,
      }

    case ACTION.LOAD_CLIENT_INVOICES_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
        payments_history: [],
        error: action.err,
      }

    default:
      return state
  }
}
