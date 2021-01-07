import {
  setCreateInvoiceState,
  loadClientsReq,
  loadClientsSuccess,
  loadClientsFailure,
  loadPlacementsReq,
  loadPlacementsSuccess,
  loadPlacementsFailure,
  loadInvoiceSettingsReq,
  loadInvoiceSettingsSuccess,
  loadInvoiceSettingsFailure,
  loadPaymentSettingsReq,
  loadPaymentSettingsSuccess,
  loadPaymentSettingsFailure,
  loadTimesheetsReq,
  loadTimesheetsSuccess,
  loadTimesheetsFailure,
  loadExpensesReq,
  loadExpensesSuccess,
  loadExpensesFailure,
  generateInvoiceReq,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  loadMailReceiversReq,
  loadMailReceiversSuccess,
  loadMailReceiversFailure,
  loadInvoiceDetailsReq,
  loadInvoiceDetailsSuccess,
  loadInvoiceDetailsFailure,
  updateInvoiceDetailsReq,
  updateInvoiceDetailsSuccess,
  updateInvoiceDetailsFailure
} from "../actions/actionCreators"
import { JSutils } from "../../../shared/JSutils"
import make_API_call from "../../../providers/REST_API"
import {
  errorMsg,
  successMsg
} from "../../../shared/SnackBars/index"

export const setState = (obj) => (dispatch) => {
  return dispatch(setCreateInvoiceState(obj))
}

export const loadInvoiceDetails = (invoiceID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadInvoiceDetailsReq())
  return getFirebase().firestore().collection(`INVOICES`)
    .doc(invoiceID)
    .get()
    .then(doc => {
      const data = doc.data()
      dispatch(loadInvoiceDetailsSuccess(data))
    }).catch(err => {
      console.error(err);
      dispatch(loadInvoiceDetailsFailure("Failed to load invoice details"))
    })
}

export const updateInvoiceDetails = (inputs, invoiceID, invoiceBy, history) => (dispatch) => {
  dispatch(updateInvoiceDetailsReq())
  const encodedID = encodeURIComponent(invoiceID)
  return make_API_call("put", `/invoices/update?invoiceID=${encodedID}&invoiceBy=${invoiceBy}`, inputs)
    .then((res) => {
      successMsg(res.message)
      history.push(`/console/invoiceslist?tab=1`)
      dispatch(updateInvoiceDetailsSuccess())
    }).catch((err) => {
      console.error(err)
      const msg = err.message
      errorMsg(msg)
      dispatch(updateInvoiceDetailsFailure(msg))
    })
}

export const loadClients = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadClientsReq())
  return getFirebase().firestore().collection("CLIENTS").get()
    .then(snap => {
      const clients = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
      console.log(clients)
      return dispatch(loadClientsSuccess(clients))
    }).catch(err => {
      console.error(err)
      return dispatch(loadClientsFailure("Failed to load clients"))
    })
}


export const loadPlacements = (id, type) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadPlacementsReq())
  if (type === "client")
    return getFirebase().firestore().collectionGroup("PLACEMENTS")
      .where("clientId", "==", id)
      .where("draft", "==", false)
      .where("isExist", "==", true)
      .get()
      .then(snap => {
        const placements = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
        return dispatch(loadPlacementsSuccess(placements))
      }).catch(err => {
        console.error(err)
        return dispatch(loadPlacementsFailure("Failed to load placements"))
      })
  else if (type === "employee") {
    return getFirebase().firestore().collection(`EMPLOYEES/${id}/PLACEMENTS`)
      .where("draft", "==", false)
      .where("isExist", "==", true)
      .get()
      .then(snap => {
        const placements = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
        return dispatch(loadPlacementsSuccess(placements))
      }).catch(err => {
        console.error(err)
        return dispatch(loadPlacementsFailure("Failed to load placements"))
      })
  }
}


export const loadInvoiceSettings = (employeeID, placementID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadInvoiceSettingsReq())
  return getFirebase().firestore().collection(`EMPLOYEES/${employeeID}/PLACEMENTS/${placementID}/SETTINGS`)
    .doc("invoices")
    .get()
    .then(doc => {
      return dispatch(loadInvoiceSettingsSuccess(doc.data()))
    }).catch(err => {
      console.error(err)
      return dispatch(loadInvoiceSettingsFailure("Failed to load invoice settings"))
    })
}


export const loadPaymentSettings = (employeeID, placementID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadPaymentSettingsReq())
  return getFirebase().firestore().collection(`EMPLOYEES/${employeeID}/PLACEMENTS/${placementID}/SETTINGS`)
    .doc("payments")
    .get()
    .then(doc => {
      return dispatch(loadPaymentSettingsSuccess(doc.data().data))
    }).catch(err => {
      console.error(err)
      return dispatch(loadPaymentSettingsFailure("Failed to load payment settings"))
    })
}


export const loadTimesheets = (employeeID, placementID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadTimesheetsReq())
  return getFirebase().firestore()
    .collection(`EMPLOYEES/${employeeID}/TIMESHEETS`)
    .where("placementID", "==", placementID)
    .where("isApproved", "==", true)
    .where("isExist", "==", true)
    .get()
    .then(snap => {
      // const data = snap.docs.map(doc => doc.data()).sort((a, b) => )
      return dispatch(loadTimesheetsSuccess(JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")))
    }).catch(err => {
      console.error(err)
      return dispatch(loadTimesheetsFailure("Failed to load timesheets"))
    })
}

export const loadExpenses = (employeeID, placementID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadExpensesReq())
  return getFirebase().firestore()
    .collection(`EMPLOYEES/${employeeID}/EXPENSES`)
    .where("placementID", "==", placementID)
    .where("isApproved", "==", true)
    .where("isExist", "==", true)
    .get()
    .then(snap => {
      return dispatch(loadExpensesSuccess(JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")))
    }).catch(err => {
      console.error(err)
      return dispatch(loadExpensesFailure("Failed to load expenses"))
    })
}


export const generateInvoice = (inputs, invoiceBy, employeeID, placementID, history) => (dispatch) => {
  dispatch(generateInvoiceReq())

  return make_API_call("post", `invoices/new?invoiceBy=${invoiceBy}&employeeID=${employeeID}&placementID=${placementID}`, inputs)
    .then((res) => {
      history.push("/console/invoiceslist?tab=1")
      successMsg(res.message)
      return dispatch(generateInvoiceSuccess())
    }).catch(err => {
      console.error(err);
      errorMsg(err.message)
      return dispatch(generateInvoiceFailure(err.message))
    })
}


export const loadMailReceivers = (clientID, employeeID, placementID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadMailReceiversReq())
  let receivers = {
    to: [],
    cc: [],
    bcc: []
  }
  return getFirebase().firestore().collection(`EMPLOYEES/${employeeID}/PLACEMENTS/${placementID}/SETTINGS`).doc("invoices")
    .get()
    .then(doc => {
      const data = doc.data()
      console.log(data)
      receivers = {
        to: data.to,
        cc: data.cc,
        bcc: data.bcc
      }
      return getFirebase().firestore().collection(`CLIENTS/${clientID}/CLIENTS_ACCOUNTS`)
        .where("isExist", "==", true)
        .get()
    }).then(snap => {
      const data = snap.docs.map(doc => doc.data())
      const to = data.map(doc => doc.to).reduce((a, b) => [...a, ...b], [])
      const cc = data.map(doc => doc.cc).reduce((a, b) => [...a, ...b], [])
      const bcc = data.map(doc => doc.bcc).reduce((a, b) => [...a, ...b], [])
      receivers = {
        to: [...receivers.to, ...to],
        cc: [...receivers.cc, ...cc],
        bcc: [...receivers.bcc, ...bcc],
      }
      return dispatch(loadMailReceiversSuccess(receivers))
    }).catch(err => {
      console.error(err);
      return dispatch(loadMailReceiversFailure("Failed to load mail receivers data"))
    })
}