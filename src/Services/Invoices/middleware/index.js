import { setInvoiceInfo } from "../actions/actionCreators"

export function uploadInvoiceInfo(payload) {
  return (dispatch, getState) => {
    const { name, value } = payload
    const invoiceInfo = getState().invoice.createInvoice
    if (!name.includes("-")) {
      const data = {
        ...invoiceInfo,
        [name]: value,
      }
      dispatch(setInvoiceInfo(data))
    } else {
      const words = name.split("-")
      const data = {
        ...invoiceInfo,
        [words[0]]: {
          ...invoiceInfo[words[0]],
          [words[1]]: value,
        },
      }
      dispatch(setInvoiceInfo(data))
    }
  }
}
