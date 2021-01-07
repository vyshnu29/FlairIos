import { ACTION } from "../actions/actionTypes"
import { initState } from "./transactionsListState"

export function transactionListReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.TRANSACTIONLIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.TRANSACTIONLIST_ERROR:
      return {
        ...state,
        transactions: [],
        error: action.err,
        isLoaded: true,
        isEmpty: true,
      }

    case ACTION.TRANSACTIONLIST_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
        isLoaded: true,
        isEmpty: true,
      }

    default:
      return state
  }
}
