import ACTION from "../actions/actionTypes"
import initState from "../state/createInvoice"

export function createInvoiceReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.SET_CREATE_INVOICE_STATE:
      return {
        ...state,
        ...action.payload,
      }


    case ACTION.LOAD_PLACEMENTS_REQ:
      return {
        ...state,
        placements: {
          data: {},
          error: "",
          isLoading: true
        }
      }

    case ACTION.LOAD_PLACEMENTS_SUCCESS:
      return {
        ...state,
        placements: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_PLACEMENTS_FAILURE:
      return {
        ...state,
        placements: {
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.LOAD_CLIENTS_REQ:
      return {
        ...state,
        clients: {
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_CLIENTS_FAILURE:
      return {
        ...state,
        clients: {
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.LOAD_INVOICE_SETTINGS_REQ:
      return {
        ...state,
        invoiceSettings: {
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_INVOICE_SETTINGS_SUCCESS:
      return {
        ...state,
        invoiceSettings: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_INVOICE_SETTINGS_FAILURE:
      return {
        ...state,
        invoiceSettings: {
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.LOAD_PAYMENT_SETTINGS_REQ:
      return {
        ...state,
        paymentSettings: {
          isLoading: true,
          data: [],
          error: ""
        }
      }

    case ACTION.LOAD_PAYMENT_SETTINGS_SUCCESS:
      return {
        ...state,
        paymentSettings: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_PAYMENT_SETTINGS_FAILURE:
      return {
        ...state,
        paymentSettings: {
          isLoading: false,
          data: [],
          error: action.payload
        }
      }

    case ACTION.LOAD_TIMESHEETS_REQ:
      return {
        ...state,
        timesheets: {
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_TIMESHEETS_SUCCESS:
      return {
        ...state,
        timesheets: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_TIMESHEETS_FAILURE:
      return {
        ...state,
        timesheets: {
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.LOAD_EXPENSES_REQ:
      return {
        ...state,
        expenses: {
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: {
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_EXPENSES_FAILURE:
      return {
        ...state,
        expenses: {
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.GENERATE_INVOICE_REQ:
      return {
        ...state,
        invoiceCreation: {
          isCreating: true,
          error: ""
        }
      }

    case ACTION.GENERATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceCreation: {
          isCreating: false,
          error: ""
        }
      }

    case ACTION.GENERATE_INVOICE_FAILURE:
      return {
        ...state,
        invoiceCreation: {
          isCreating: false,
          error: action.payload
        }
      }


    case ACTION.LOAD_MAIL_RECEIVERS_REQ:
      return {
        ...state,
        mailReceivers: {
          isLoading: true,
          data: {},
          error: ""
        }

      }

    case ACTION.LOAD_MAIL_RECEIVERS_SUCCESS:
      return {
        ...state,
        mailReceivers: {
          isLoading: false,
          data: action.payload,
          error: ""
        }

      }

    case ACTION.LOAD_MAIL_RECEIVERS_FAILURE:
      return {
        ...state,
        mailReceivers: {
          isLoading: false,
          data: {},
          error: action.payload
        }

      }


    case ACTION.LOAD_INVOICE_DETAILS_REQ:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_INVOICE_DETAILS_SUCCESS:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isLoading: false,
          data: action.payload,
          error: ""
        }
      }

    case ACTION.LOAD_INVOICE_DETAILS_REQ:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isLoading: false,
          data: {},
          error: action.payload
        }
      }

    case ACTION.UPDATE_INVOICE_DETAILS_REQ:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isUpdating: true,
          updateError: ""
        }
      }

    case ACTION.UPDATE_INVOICE_DETAILS_SUCCESS:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isUpdating: false,
          updateError: ""
        }
      }

    case ACTION.UPDATE_INVOICE_DETAILS_FAILURE:
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          isUpdating: false,
          updateError: action.payload
        }
      }

    default:
      return state
  }
}
