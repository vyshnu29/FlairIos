import {
  clientInvoicesSetListener,
  loadClientInvoicesFailure,
  loadClientInvoicesReq,
  loadClientInvoicesSuccess,
  clientInvoicesRemoveListener,
  loadPaymentsHistoryFailure,
  loadPaymentsHistorySuccess,
  loadPaymentsHistoryReq,
} from "../actions/actionCreators"
import { errorMsg, successMsg, waitingMsg, stopWaitMsg } from "../../../shared/SnackBars/index"
import make_API_call from "../../../providers/REST_API"
import firestore from '@react-native-firebase/firestore'

export const addDiscountToOpenBalance = (index) => {
  return (dispatch, getState) => {
    let clientInvoices = getState().payments.paymentsList.clientInvoices
    let totalAmount = clientInvoices[index].totalAmount
    let discountType = clientInvoices[index].paymentDiscountDetails.type
    let discountValue = clientInvoices[index].paymentDiscountDetails.value
    let discountAmount = 0
    const { receivedAmount, paymentDiscountAmount, paymentAmount } = clientInvoices[index]
    if (discountType === "byValue") {
      discountAmount = discountValue
    } else {
      discountAmount = ((discountValue * totalAmount) / 100).toFixed(2)
    }
    let updatedIndex = {
      ...clientInvoices[index],
      discountAmount: discountAmount,
      openBalance:
        totalAmount - receivedAmount - paymentDiscountAmount - paymentAmount - discountAmount,
    }
    clientInvoices[index] = updatedIndex
    dispatch(loadClientInvoicesSuccess(clientInvoices))
  }
}

export const setDiscountDetails = (index, key, value) => {
  return (dispatch, getState) => {
    let clientInvoices = getState().payments.paymentsList.clientInvoices
    let updatedIndex = {
      ...clientInvoices[index],
      paymentDiscountDetails: {
        ...clientInvoices[index]["paymentDiscountDetails"],
        [key]: value,
      },
    }
    clientInvoices[index] = updatedIndex
    dispatch(loadClientInvoicesSuccess(clientInvoices))
  }
}

export const setPaymentAmount = (index, value) => {
  return (dispatch, getState) => {
    let clientInvoices = getState().payments.paymentsList.clientInvoices
    const { totalAmount, receivedAmount, paymentDiscountAmount, discountAmount } = clientInvoices[
      index
    ]
    let updatedIndex = {
      ...clientInvoices[index],
      paymentAmount: Number(value),
      openBalance:
        totalAmount - receivedAmount - paymentDiscountAmount - Number(value) - discountAmount,
    }
    clientInvoices[index] = updatedIndex
    dispatch(loadClientInvoicesSuccess(clientInvoices))
  }
}

export const loadClientInvoices = (clientId) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadClientInvoicesReq())
  // const subscribe = getFirebase()
  console.log("Aaf",clientId)
    firestore()
    .collection("INVOICES")
    .where("clientID", "==", clientId)
    .where("isPaymentDone", "==", false)
    .where("isExist", "==", true)
    .where("isVoid", "==", false)
    .onSnapshot(
      (snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            paymentAmount: 0,
            paymentDiscountDetails: {
              name: "",
              type: "",
              value: 0,
            },
            discountAmount: 0,
            openBalance:
              doc.data().totalAmount - doc.data().receivedAmount - doc.data().paymentDiscountAmount,
          }
        })
        dispatch(loadClientInvoicesSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load client invoices"
        errorMsg(msg)
        dispatch(loadClientInvoicesFailure(msg))
      }
    )
 // dispatch(clientInvoicesSetListener(subscribe))
}

export const unsubscribe = () => {
  return (dispatch, getState) => {
  //  const listener = getState().payments.paymentsList.listener
   // listener()
    dispatch(clientInvoicesRemoveListener())
  }
}

export function newPayment(payload, clearState) {
  return function () {
    waitingMsg("Paying the invoice...")
    make_API_call("post", "/payments/new", payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
        clearState()
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function getPaymentsHistory(id) {
  return function (dispatch) {
    dispatch(loadPaymentsHistoryReq())
    make_API_call("put", `/payments/history`, { id })
      .then((data) => {
        console.log(data)
        return dispatch(loadPaymentsHistorySuccess(data.payments_history))
      })
      .catch((err) => {
        console.error(err.err)
        return dispatch(loadPaymentsHistoryFailure(err.err))
      })
  }
}