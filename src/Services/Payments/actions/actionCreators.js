import { ACTION } from "./actionTypes"

export const clientInvoicesRemoveListener = () => ({
  type: ACTION.CLIENT_INVOICES_REMOVE_LISTENER,
})

export const clientInvoicesSetListener = (payload) => ({
  type: ACTION.CLIENT_INVOICES_SET_LISTENER,
  payload,
})

export const loadClientInvoicesSuccess = (payload) => ({
  type: ACTION.LOAD_CLIENT_INVOICES_SUCCESS,
  payload,
})

export const loadClientInvoicesFailure = (err) => ({
  type: ACTION.LOAD_CLIENT_INVOICES_FAILURE,
  err,
})

export const loadClientInvoicesReq = (err) => ({
  type: ACTION.LOAD_CLIENT_INVOICES_REQ,
})

export const loadPaymentsHistoryReq = () => ({
  type: ACTION.LOAD_INVOICE_PAYMENTS_HISTORY_REQ,
})

export const loadPaymentsHistorySuccess = (payload) => ({
  type: ACTION.LOAD_INVOICE_PAYMENTS_HISTORY_SUCCESS,
  payload,
})

export const loadPaymentsHistoryFailure = (err) => ({
  type: ACTION.LOAD_INVOICE_PAYMENTS_HISTORY_FAILURE,
  err,
})