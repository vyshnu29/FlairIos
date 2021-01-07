import ACTION from "../actions/actionTypes"
import invoiceListState from "../reducers/expenseListState"

export default (state = invoiceListState, { type, payload }) => {
  switch (type) {
    case ACTION.SET_STATE:
      return {
        ...state,
        ...payload,
      }

    case ACTION.SET_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: payload.listener,
        },
      }

    case ACTION.UNSUBSCRIBE_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: () => {},
        },
      }

    case ACTION.LOAD_SUBMITTED_EXPENSES_REQUEST:
      return {
        ...state,
        submittedExpenses: {
          ...state.submittedExpenses,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_SUBMITTED_EXPENSES_SUCCESS:
      return {
        ...state,
        submittedExpenses: {
          ...state.submittedExpenses,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.submittedExpenses.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_SUBMITTED_EXPENSES_FAILURE:
      return {
        ...state,
        submittedExpenses: {
          ...state.submittedExpenses,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_APPROVED_EXPENSES_REQUEST:
      return {
        ...state,
        approvedExpenses: {
          ...state.approvedExpenses,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_APPROVED_EXPENSES_SUCCESS:
      return {
        ...state,
        approvedExpenses: {
          ...state.approvedExpenses,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.approvedExpenses.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_APPROVED_EXPENSES_FAILURE:
      return {
        ...state,
        approvedExpenses: {
          ...state.approvedExpenses,
          isLoading: false,
          error: payload,
        },
      }
    case ACTION.LOAD_REJECTED_EXPENSES_REQUEST:
      return {
        ...state,
        rejectedExpenses: {
          ...state.rejectedExpenses,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_REJECTED_EXPENSES_SUCCESS:
      return {
        ...state,
        rejectedExpenses: {
          ...state.rejectedExpenses,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.rejectedExpenses.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_REJECTED_EXPENSES_FAILURE:
      return {
        ...state,
        rejectedExpenses: {
          ...state.rejectedExpenses,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_MY_EXPENSES_REQUEST:
      return {
        ...state,
        myExpenses: {
          ...state.myExpenses,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_MY_EXPENSES_SUCCESS:
      return {
        ...state,
        myExpenses: {
          ...state.myExpenses,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.myExpenses.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_MY_EXPENSES_FAILURE:
      return {
        ...state,
        myExpenses: {
          ...state.myExpenses,
          isLoading: false,
          error: payload,
        },
      }
    // case ACTION.LOAD_OPEN_INVOICES_REQ:
    //   return {
    //     ...state,
    //     openInvoices: {
    //       ...state.openInvoices,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_OPEN_INVOICES_SUCCESS:
    //   return {
    //     ...state,
    //     openInvoices: {
    //       ...state.openInvoices,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.openInvoices.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_OPEN_INVOICES_FAILURE:
    //   return {
    //     ...state,
    //     openInvoices: {
    //       ...state.openInvoices,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }

    // case ACTION.LOAD_VOID_INVOICES_REQ:
    //   return {
    //     ...state,
    //     voidInvoices: {
    //       ...state.voidInvoices,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_VOID_INVOICES_SUCCESS:
    //   return {
    //     ...state,
    //     voidInvoices: {
    //       ...state.voidInvoices,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.voidInvoices.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_VOID_INVOICES_FAILURE:
    //   return {
    //     ...state,
    //     voidInvoices: {
    //       ...state.voidInvoices,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }

    // case ACTION.LOAD_PAID_INVOICES_REQ:
    //   return {
    //     ...state,
    //     paidInvoices: {
    //       ...state.paidInvoices,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_PAID_INVOICES_SUCCESS:
    //   return {
    //     ...state,
    //     paidInvoices: {
    //       ...state.paidInvoices,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.paidInvoices.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_PAID_INVOICES_FAILURE:
    //   return {
    //     ...state,
    //     paidInvoices: {
    //       ...state.paidInvoices,
    //       isLoading: true,
    //       error: payload,
    //     },
    //   }

    // case ACTION.LOAD_ALL_INVOICES_REQ:
    //   return {
    //     ...state,
    //     allInvoices: {
    //       ...state.allInvoices,
    //       isLoading: true,
    //       error: "",
    //     },
    //   }

    // case ACTION.LOAD_ALL_INVOICES_SUCCESS:
    //   return {
    //     ...state,
    //     allInvoices: {
    //       ...state.allInvoices,
    //       isLoading: false,
    //       data: payload,
    //       error: "",
    //       noOfLoadings: state.allInvoices.noOfLoadings + 1,
    //     },
    //   }

    // case ACTION.LOAD_ALL_INVOICES_FAILURE:
    //   return {
    //     ...state,
    //     allInvoices: {
    //       ...state.allInvoices,
    //       isLoading: false,
    //       error: payload,
    //     },
    //   }

    // case ACTION.MAKE_INVOICE_VOID_REQ:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       voidingInvoices: [...state.actions.voidingInvoices, payload],
    //     },
    //   }

    // case ACTION.MAKE_INVOICE_VOID_SUCCESS:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       voidingInvoices: state.actions.voidingInvoices.filter(
    //         (id) => id !== payload
    //       ),
    //       errorWhileVoiding: state.actions.errorWhileVoiding.filter(
    //         (id) => id !== payload
    //       ),
    //     },
    //   }

    // case ACTION.MAKE_INVOICE_VOID_FAILURE:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       voidingInvoices: state.actions.voidingInvoices.filter(
    //         (id) => id !== payload
    //       ),
    //       errorWhileVoiding: [...state.actions.errorWhileVoiding, payload],
    //     },
    //   }

    // case ACTION.SEND_INVOICE_TO_CLIENT_REQ:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       mailingInvoices: [...state.actions.mailingInvoices, payload],
    //     },
    //   }

    // case ACTION.SEND_INVOICE_TO_CLIENT_SUCCESS:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       mailingInvoices: state.actions.mailingInvoices.filter(
    //         (id) => id !== payload
    //       ),
    //       errorWhileMailing: state.actions.errorWhileMailing.filter(
    //         (id) => id !== payload
    //       ),
    //     },
    //   }

    // case ACTION.SEND_INVOICE_TO_CLIENT_FAILURE:
    //   return {
    //     ...state,
    //     actions: {
    //       ...state.actions,
    //       mailingInvoices: state.actions.mailingInvoices.filter(
    //         (id) => id !== payload
    //       ),
    //       errorWhileMailing: [...state.actions.errorWhileMailing, payload],
    //     },
    //   }

    // case ACTION.LOAD_INVOICE_ATTACHMENTS_REQ:
    //   return {
    //     ...state,
    //     sendInvoiceToClient: {
    //       ...state.sendInvoiceToClient,
    //       attachments: {
    //         ...state.sendInvoiceToClient.attachments,
    //         [payload]: {
    //           ...state.sendInvoiceToClient.attachments[payload.invoiceID],
    //           isLoading: true,
    //           error: "",
    //         },
    //       },
    //     },
    //   }

    // case ACTION.LOAD_INVOICE_ATTACHMENTS_SUCCESS:
    //   return {
    //     ...state,
    //     sendInvoiceToClient: {
    //       ...state.sendInvoiceToClient,
    //       attachments: {
    //         ...state.sendInvoiceToClient.attachments,
    //         [payload.invoiceID]: {
    //           isLoading: false,
    //           error: "",
    //           data: payload.data,
    //         },
    //       },
    //     },
    //   }

    // case ACTION.LOAD_INVOICE_ATTACHMENTS_REQ:
    //   return {
    //     ...state,
    //     sendInvoiceToClient: {
    //       ...state.sendInvoiceToClient,
    //       attachments: {
    //         ...state.sendInvoiceToClient.attachments,
    //         [payload.invoiceID]: {
    //           ...state.sendInvoiceToClient.attachments[payload.invoiceID],
    //           isLoading: false,
    //           error: payload.error,
    //         },
    //       },
    //     },
    //   }
    default:
      return state
  }
}
