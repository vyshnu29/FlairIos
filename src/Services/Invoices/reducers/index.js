import { combineReducers } from "redux"
import { createInvoiceReducer } from "./createInvoiceReducer"
import invoiceListReducer from "./invoiceList"

const rootReducer = combineReducers({
  createInvoice: createInvoiceReducer,
  invoiceList: invoiceListReducer
})

export default rootReducer
