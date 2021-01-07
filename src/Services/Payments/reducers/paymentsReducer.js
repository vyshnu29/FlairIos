import { ACTION } from "../actions/actionTypes"
import { initState } from "./paymentsState"

export default function paymentsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.CLIENT_INVOICES_REMOVE_LISTENER:
      return {
        ...state,
        listener: () => {},
      }

    case ACTION.CLIENT_INVOICES_SET_LISTENER:
      return {
        ...state,
        listener: action.payload,
      }

    case ACTION.LOAD_CLIENT_INVOICES_REQ:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.LOAD_CLIENT_INVOICES_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        clientInvoices: action.payload,
        error: "",
      }

    case ACTION.LOAD_CLIENT_INVOICES_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
        clientInvoices: [],
        error: action.err,
      }

    default:
      return state
  }
}
