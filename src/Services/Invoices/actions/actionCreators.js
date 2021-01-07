import ACTION from "./actionTypes"

export const setStateAction = (payload) => ({
  type: ACTION.SET_STATE,
  payload
})

export const setListener = (listener, type) => ({
  type: ACTION.SET_LISTENER,
  payload: {
    listener,
    type
  }
})


export const unSubscribeListenerAction = (payload) => ({
  type: ACTION.UNSUBSCRIBE_LISTENER,
  payload
})

export const getPreviewInvoiceReq = () => ({
  type: ACTION.GET_PREVIEW_INVOICE_REQ,
})

export const getPreviewInvoiceSuccess = (payload) => {
  return {
    type: ACTION.GET_PREVIEW_INVOICE_SUCCESS,
    payload,
  }
}

export const getPreviewInvoiceFailure = (err) => ({
  type: ACTION.GET_PREVIEW_INVOICE_FAILURE,
  err,
})


export const downloadInvoiceReq = () => ({
  type: ACTION.DOWNLOAD_INVOICE_REQ,
})

export const downloadInvoiceSuccess = (url) => ({
  type: ACTION.DOWNLOAD_INVOICE_SUCCESS,
  url,
})

export const downloadInvoiceFailure = (err) => ({
  type: ACTION.DOWNLOAD_INVOICE_FAILURE,
  err,
})


export const loadDueInvoicesReq = () => ({
  type: ACTION.LOAD_DUE_INVOICES_REQ
})

export const loadDueInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_DUE_INVOICES_SUCCESS,
  payload
})

export const loadDueInvoicesFailure = (payload) => ({
  type: ACTION.LOAD_DUE_INVOICES_FAILURE,
  payload
})

export const loadOpenInvoicesReq = () => ({
  type: ACTION.LOAD_OPEN_INVOICES_REQ
})

export const loadOpenInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_OPEN_INVOICES_SUCCESS,
  payload
})

export const loadOpenInvoicesFailure = (payload) => ({
  type: ACTION.LOAD_OPEN_INVOICES_FAILURE,
  payload
})

export const loadVoidInvoicesReq = () => ({
  type: ACTION.LOAD_VOID_INVOICES_REQ
})

export const loadVoidInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_VOID_INVOICES_SUCCESS,
  payload
})

export const loadVoidInvoicesFailure = (payload) => ({
  type: ACTION.LOAD_VOID_INVOICES_FAILURE,
  payload
})

export const loadPaidInvoicesReq = () => ({
  type: ACTION.LOAD_PAID_INVOICES_REQ
})

export const loadPaidInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_PAID_INVOICES_SUCCESS,
  payload
})

export const loadPaidInvoicesFailure = (payload) => ({
  type: ACTION.LOAD_PAID_INVOICES_FAILURE,
  payload
})

export const loadAllInvoicesReq = (payload) => ({
  type: ACTION.LOAD_ALL_INVOICES_REQ
})

export const loadAllInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_ALL_INVOICES_SUCCESS,
  payload
})

export const loadAllInvoicesFailure = (payload) => ({
  type: ACTION.LOAD_ALL_INVOICES_FAILURE,
  payload
})

export const makeInvoiceVoidReq = (payload) => ({
  type: ACTION.MAKE_INVOICE_VOID_REQ,
  payload: payload
})

export const makeInvoiceVoidSuccess = (payload) => ({
  type: ACTION.MAKE_INVOICE_VOID_SUCCESS,
  payload
})

export const makeInvoiceVoidFailure = (payload) => ({
  type: ACTION.MAKE_INVOICE_VOID_FAILURE,
  payload
})

export const sendInvoiceToClientReq = (payload) => ({
  type: ACTION.SEND_INVOICE_TO_CLIENT_REQ,
  payload
})

export const sendInvoiceToClientSuccess = (payload) => ({
  type: ACTION.SEND_INVOICE_TO_CLIENT_SUCCESS,
  payload
})

export const sendInvoiceToClientFailure = (payload) => ({
  type: ACTION.SEND_INVOICE_TO_CLIENT_FAILURE,
  payload
})

export const loadInvoiceAttachmentsReq = (payload) => ({
  type: ACTION.LOAD_INVOICE_ATTACHMENTS_REQ,
  payload
})

export const loadInvoiceAttachmentsSuccess = (payload) => ({
  type: ACTION.LOAD_INVOICE_ATTACHMENTS_SUCCESS,
  payload
})

export const loadInvoiceAttachmentsFailure = (payload) => ({
  type: ACTION.LOAD_INVOICE_ATTACHMENTS_FAILURE,
  payload
})

export const loadMailReceiversReq = () => ({
  type: ACTION.LOAD_MAIL_RECEIVERS_REQ,
})

export const loadMailReceiversSuccess = (payload) => ({
  type: ACTION.LOAD_MAIL_RECEIVERS_SUCCESS,
  payload
})

export const loadMailReceiversFailure = (payload) => ({
  type: ACTION.LOAD_MAIL_RECEIVERS_FAILURE,
  payload
})

export const loadInvoiceDetailsReq = () => ({
  type: ACTION.LOAD_INVOICE_DETAILS_REQ,
})

export const loadInvoiceDetailsSuccess = (payload) => ({
  type: ACTION.LOAD_INVOICE_DETAILS_SUCCESS,
  payload
})

export const loadInvoiceDetailsFailure = (payload) => ({
  type: ACTION.LOAD_INVOICE_DETAILS_FAILURE,
  payload
})

export const updateInvoiceDetailsReq = () => ({
  type: ACTION.UPDATE_INVOICE_DETAILS_REQ,
})

export const updateInvoiceDetailsSuccess = (payload) => ({
  type: ACTION.UPDATE_INVOICE_DETAILS_SUCCESS,
  payload
})

export const updateInvoiceDetailsFailure = (payload) => ({
  type: ACTION.UPDATE_INVOICE_DETAILS_FAILURE,
  payload
})
















// invoice creation

export const setCreateInvoiceState = (payload) => ({
  type: ACTION.SET_CREATE_INVOICE_STATE,
  payload
})

export const loadPlacementsReq = () => ({
  type: ACTION.LOAD_PLACEMENTS_REQ,
})

export const loadPlacementsSuccess = (payload) => ({
  type: ACTION.LOAD_PLACEMENTS_SUCCESS,
  payload
})

export const loadPlacementsFailure = (payload) => ({
  type: ACTION.LOAD_PLACEMENTS_FAILURE,
  payload
})


export const loadClientsReq = () => ({
  type: ACTION.LOAD_CLIENTS_REQ
})

export const loadClientsSuccess = (payload) => ({
  type: ACTION.LOAD_CLIENTS_SUCCESS,
  payload
})

export const loadClientsFailure = (payload) => ({
  type: ACTION.LOAD_CLIENTS_FAILURE,
  payload
})

export const loadInvoiceSettingsReq = (payload) => ({
  type: ACTION.LOAD_INVOICE_SETTINGS_REQ
})

export const loadInvoiceSettingsSuccess = (payload) => ({
  type: ACTION.LOAD_INVOICE_SETTINGS_SUCCESS,
  payload
})

export const loadInvoiceSettingsFailure = (payload) => ({
  type: ACTION.LOAD_INVOICE_SETTINGS_FAILURE,
  payload
})

export const loadPaymentSettingsReq = (payload) => ({
  type: ACTION.LOAD_PAYMENT_SETTINGS_REQ,
})

export const loadPaymentSettingsSuccess = (payload) => ({
  type: ACTION.LOAD_PAYMENT_SETTINGS_SUCCESS,
  payload
})

export const loadPaymentSettingsFailure = (payload) => ({
  type: ACTION.LOAD_PAYMENT_SETTINGS_FAILURE,
  payload
})


export const loadTimesheetsReq = (payload) => ({
  type: ACTION.LOAD_TIMESHEETS_REQ,
})

export const loadTimesheetsSuccess = (payload) => ({
  type: ACTION.LOAD_TIMESHEETS_SUCCESS,
  payload
})

export const loadTimesheetsFailure = (payload) => ({
  type: ACTION.LOAD_TIMESHEETS_FAILURE,
  payload
})


export const loadExpensesReq = (payload) => ({
  type: ACTION.LOAD_EXPENSES_REQ,
})

export const loadExpensesSuccess = (payload) => ({
  type: ACTION.LOAD_EXPENSES_SUCCESS,
  payload
})

export const loadExpensesFailure = (payload) => ({
  type: ACTION.LOAD_EXPENSES_FAILURE,
  payload
})

export const generateInvoiceReq = () => ({
  type: ACTION.GENERATE_INVOICE_REQ
})

export const generateInvoiceSuccess = () => ({
  type: ACTION.GENERATE_INVOICE_SUCCESS
})

export const generateInvoiceFailure = (payload) => ({
  type: ACTION.GENERATE_INVOICE_FAILURE,
  payload
})









