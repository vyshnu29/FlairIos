import {
  setState,
  setListener,
  unsetListener,
  loadPayrollListReq,
  loadPayrollListSuccess,
  loadPayrollListFailure,
  loadPayrollSettingsReq,
  loadPayrollSettingsSuccess,
  loadPayrollSettingsFailure,
  updatePayrollSettingsReq,
  updatePayrollSettingsSuccess,
  updatePayrollSettingsFailure,
  generatePayrollForEmployeeReq,
  generatePayrollForEmployeeSuccess,
  generatePayrollForEmployeeFailure
} from "../actions/actionCreators"
import { JSutils } from "../../../shared/JSutils"
import make_API_call from "../../../providers/REST_API"
import {
  errorMsg,
  successMsg
} from "../../../shared/SnackBars/index"

export const _set_state = (obj) => (dispatch) => {
  return dispatch(setState(obj))
}

export const loadPayrollList = (listAll, employeeID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadPayrollListReq())
  let subscribe;
  if (listAll)
    subscribe = getFirebase().firestore().collectionGroup("PAYROLL_RECORDS")
      .where("isExist", "==", true)
      .orderBy("createdAt", "desc")
      .get()
      .then(snap => {
        const data = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
        return dispatch(loadPayrollListSuccess(data))
      }).catch(err => {
        console.error(err);
        return dispatch(loadPayrollListFailure("Failed to load payrolls"))
      })
  else
    subscribe = getFirebase().firestore().collection(`PAYROLLS/${employeeID}/PAYROLL_RECORDS`)
      .where("isExist", "==", true)
      .orderBy("createdAt", "desc")
      .onSnapshot(snap => {
        const data = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
        return dispatch(loadPayrollListSuccess(data))
      }, (err) => {
        console.error(err)
        const msg = "Failed to load payrolls"
        errorMsg(msg)
        return dispatch(loadPayrollListFailure(msg))
      })

  dispatch(setListener(subscribe))


  // .get()
  // .then(snap => {
  //   const data = JSutils._array_to_object(snap.docs.map(doc => doc.data()), "id")
  //   console.log(data)
  //   return dispatch(loadPayrollListSuccess(data))
  // }).catch(err => {
  //   console.error(err);
  //   return dispatch(loadPayrollListFailure("Failed to load payrolls"))
  // })
}


export const unsubscribeListener = () => (dispatch, getState) => {
  // const listener = getState().payrolls.payrollList.listener
  // listener()
  dispatch(unsetListener())
}

export const loadPayrollSettings = (employeeID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadPayrollSettingsReq())
  return getFirebase().firestore().collection(`PAYROLLS`).doc(employeeID)
    .get()
    .then(doc => {
      return dispatch(loadPayrollSettingsSuccess(doc.data()))
    }).catch(err => {
      console.error(err);
      return dispatch(loadPayrollSettingsFailure("Failed to load payroll settings"))
    })
}

export const updatePayrollSettings = (obj, employeeID) => (dispatch) => {
  dispatch(updatePayrollSettingsReq(employeeID))
  return make_API_call("put", `/payrolls/update?employeeID=${employeeID}`, obj)
    .then(() => {
      successMsg(`Payroll settings updated successfully`)
      return dispatch(updatePayrollSettingsSuccess(employeeID))
    }).catch((err) => {
      console.error(err);
      errorMsg(`Failed to update payroll settings`)
      return dispatch(updatePayrollSettingsFailure(employeeID))
    })
}

export const generatePayrollForEmployee = (employeeID) => (dispatch) => {
  dispatch(generatePayrollForEmployeeReq(employeeID))
  return make_API_call("post", `/payrolls/generate?employeeID=${employeeID}`)
    .then(() => {
      successMsg(`Payroll generated successfully`)
      return dispatch(generatePayrollForEmployeeSuccess(employeeID))
    }).catch((err) => {
      console.error(err);
      const msg = err.message
      errorMsg(msg)
      return dispatch(generatePayrollForEmployeeFailure(employeeID))
    })
}