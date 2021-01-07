import {
  setStateAction,
  setListener,
  unSubscribeListenerAction,
  loadOpenInvoicesReq,
  loadOpenInvoicesSuccess,
  loadOpenInvoicesFailure,
  loadDueInvoicesReq,
  loadDueInvoicesSuccess,
  loadDueInvoicesFailure,
  loadVoidInvoicesReq,
  loadVoidInvoicesSuccess,
  loadVoidInvoicesFailure,
  loadPaidInvoicesReq,
  loadPaidInvoicesSuccess,
  loadPaidInvoicesFailure,
  loadAllInvoicesReq,
  loadAllInvoicesSuccess,
  loadAllInvoicesFailure,
  makeInvoiceVoidReq,
  makeInvoiceVoidSuccess,
  makeInvoiceVoidFailure,
  sendInvoiceToClientReq,
  sendInvoiceToClientSuccess,
  sendInvoiceToClientFailure,
  loadInvoiceAttachmentsReq,
  loadInvoiceAttachmentsSuccess,
  loadInvoiceAttachmentsFailure,
  downloadInvoiceSuccess,
  downloadInvoiceFailure,
  downloadInvoiceReq,
  getPreviewInvoiceFailure,
  getPreviewInvoiceReq,
  getPreviewInvoiceSuccess,
} from "../actions/actionCreators"
import { JSutils } from "../../../shared/JSutils"
import firestore from '@react-native-firebase/firestore'
import { errorMsg, waitingMsg, stopWaitMsg, successMsg } from "../../../shared/SnackBars/index"
import make_API_call from "../../../providers/REST_API"

export function getInvoiceHTML(invoiceID) {
  return (dispatch) => {
    dispatch(getPreviewInvoiceReq())
    console.log(invoiceID)
    make_API_call("put", `invoices/preview`, { id: invoiceID })
      .then((data) => {
        console.log(data)
        return dispatch(getPreviewInvoiceSuccess(data.html))
      })
      .catch((error) => {
        dispatch(getPreviewInvoiceFailure(error))
      })
  }
}

export const downloadInvoice = (generatedInvoiceFilePath) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(downloadInvoiceReq())
  const storage = getFirebase().storage()
  storage
    .refFromURL(generatedInvoiceFilePath)
    .getDownloadURL()
    .then((url) => {
      window.open(url)
      return dispatch(downloadInvoiceSuccess(url))
      // return storage.refFromURL(generatedInvoiceFilePath)
    })
    .catch((err) => {
      console.error(err)
      stopWaitMsg()
      const msg = "Failed to download"
      errorMsg(msg)
      return dispatch(downloadInvoiceFailure(err))
    })
}

export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const loadDueInvoices = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadDueInvoicesReq())
  const subscribe = 
    firestore()
    .collection("INVOICES")
    .where("invoiceDueDate", "<", Date.parse(new Date()))
    .where("isPaymentDone", "==", false)
    .where("isVoid", "==", false)
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadDueInvoicesSuccess(data))
      },
        (err) => {
          console.error(err)
          const msg = "Failed to load due invoices"
          errorMsg(msg)
          return dispatch(loadDueInvoicesFailure(msg))
        }
    )

  dispatch(setListener(subscribe, "dueInvoices"))
}

export const loadOpenInvoices = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadOpenInvoicesReq())
  const subscribe = 
  firestore()
    .collection("INVOICES")
    .where("isPaymentDone", "==", false)
    .where("isVoid", "==", false)
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadOpenInvoicesSuccess(data))
      },
        (err) => {
          console.error(err)
          const msg = "Failed to load due invoices"
          errorMsg(msg)
          return dispatch(loadOpenInvoicesFailure(msg))
        }
    )

  dispatch(setListener(subscribe, "openInvoices"))
}

export const loadVoidInvoices = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadVoidInvoicesReq())
  const subscribe = 
  firestore()
    .collection("INVOICES")
    .where("isVoid", "==", true)
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadVoidInvoicesSuccess(data))
      },
        (err) => {
          console.error(err)
          const msg = "Failed to load void invoices"
          errorMsg(msg)
          return dispatch(loadVoidInvoicesFailure(msg))
        }
    )

  dispatch(setListener(subscribe, "voidInvoices"))
}

export const loadPaidInvoices = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadPaidInvoicesReq())
  const subscribe = 
  firestore()
    .collection("INVOICES")
    .where("isPaymentDone", "==", true)
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadPaidInvoicesSuccess(data))
      },
        (err) => {
          console.error(err)
          const msg = "Failed to load paid invoices"
          errorMsg(msg)
          return dispatch(loadPaidInvoicesFailure(msg))
        }
    )

  dispatch(setListener(subscribe, "paidInvoices"))
}

export const loadAllInvoices = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadAllInvoicesReq())
  const subscribe = 
  firestore()
    .collection("INVOICES")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadAllInvoicesSuccess(data))
      },
        (err) => {
          console.error(err)
          const msg = "Failed to load all invoices"
          errorMsg(msg)
          return dispatch(loadAllInvoicesFailure(msg))
        }
    )

  dispatch(setListener(subscribe, "allInvoices"))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const invoiceState = getState().invoice.invoiceList
  const unsubscribe = invoiceState[type].listener
  
  return dispatch(unSubscribeListenerAction({ type }))
}

export const makeInvoiceVoid = (invoiceID) => (dispatch) => {
  dispatch(makeInvoiceVoidReq(invoiceID))
  const encodedID = encodeURIComponent(invoiceID)
  return make_API_call("put", `/invoices/makevoid?invoiceID=${encodedID}`)
    .then((res) => {
      stopWaitMsg()
      successMsg(res.message)
      return dispatch(makeInvoiceVoidSuccess(invoiceID))
    })
    .catch((err) => {
      stopWaitMsg()
      errorMsg(err.message)
      return dispatch(makeInvoiceVoidFailure(invoiceID))
    })
}

export const sendInvoiceToClient = (inputs, invoiceID) => (dispatch) => {
  dispatch(sendInvoiceToClientReq(invoiceID))
  const encodedID = encodeURIComponent(invoiceID)
  return make_API_call("post", `/invoices/sendinvoicetoclient?invoiceID=${encodedID}`, inputs)
    .then((res) => {
      stopWaitMsg()
      successMsg(res.message)
      return dispatch(sendInvoiceToClientSuccess(invoiceID))
    })
    .catch((err) => {
      stopWaitMsg()
      errorMsg(err.message)
      return dispatch(sendInvoiceToClientFailure(invoiceID))
    })
}

export const loadInvoiceAttachments = (invoice, invoiceID) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadInvoiceAttachmentsReq(invoiceID))
  // const invoiceListState = getState().invoice.invoiceList
  let attachments = []
  // generated

  const generatedInvoiceFilePath = invoice.invoiceDetails.generatedInvoiceFilePath

  // attached
  if (invoice.invoiceBy !== "external") {
    const timesheetAttachmentInInvoice = {
      name: invoice.timesheetAttachment.sourcePath.split("/").reverse()[0],
      url: invoice.timesheetAttachment.publicURL,
      type: "timesheet",
      submissionType: "attached",
    }

    attachments.push(timesheetAttachmentInInvoice)

    const expenseAttachmentInInvoice = {
      name: invoice.expenseAttachment.sourcePath.split("/").reverse()[0],
      url: invoice.expenseAttachment.publicURL,
      type: "expense",
      submissionType: "attached",
    }
    attachments.push(expenseAttachmentInInvoice)

    const submittedTimesheetsURLs = invoice.timesheets.map((item) => {
      return {
        name: item.attachmentDetails.sourcePath.split("/").reverse()[0],
        url: item.attachmentDetails.publicURL,
        type: "timesheet",
        submissionType: "attached",
      }
    })

    attachments = [...attachments, ...submittedTimesheetsURLs]

    const submittedExpensesURLs = invoice.expenses.map((item) => {
      return {
        name: item.attachmentDetails.sourcePath.split("/").reverse()[0],
        url: item.attachmentDetails.publicURL,
        type: "expense",
        submissionType: "attached",
      }
    })

    attachments = [...attachments, ...submittedExpensesURLs]
  }

  const storage = getFirebase().storage()
  storage
    .refFromURL(generatedInvoiceFilePath)
    .getDownloadURL()
    .then((url) => {
      attachments.push({
        name: invoiceID,
        url: url,
        type: "invoice",
        submissionType: "generated",
      })
      return dispatch(loadInvoiceAttachmentsSuccess({ invoiceID: invoiceID, data: attachments }))
      // return storage.refFromURL(generatedInvoiceFilePath)
    })
    .catch((err) => {
      console.error(err)
      stopWaitMsg()
      const msg = "Failed to load invoice attachments for " + invoiceID
      errorMsg(msg)
      return dispatch(loadInvoiceAttachmentsFailure({ invoiceID: invoiceID, error: msg }))
    })
}
