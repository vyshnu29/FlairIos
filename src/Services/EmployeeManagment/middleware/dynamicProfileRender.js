import {
  loadProfileTemplateReq,
  loadProfileTemplateSuccess,
  loadProfileTemplateFailure,
  loadEmployeeProfileReq,
  loadEmployeeProfileSuccess,
  loadEmployeeProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure
} from "../actions/dynamicProfileRenderActionCreators"
import { setStateAction } from "../actions/actionCreators"
import {
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import make_API_call from "../../../providers/REST_API"

export const _set_state = (obj) => (dispatch) => {
  dispatch(setStateAction(obj))
}

export const loadProfileTemplate = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadProfileTemplateReq())
  return getFirebase().firestore()
    .collection(`WEB_BUILDER`)
    .doc("employee-profile")
    .get()
    .then(doc => {
      return dispatch(loadProfileTemplateSuccess(doc.data()))
    }).catch(err => {
      console.error(err);
      return dispatch(loadProfileTemplateFailure("Failed to load profile template"))
    })
}


export const loadEmployeeProfile = (employeeID) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadEmployeeProfileReq())
  return getFirebase().firestore()
    .collection(`EMPLOYEES`)
    .doc(employeeID)
    .get()
    .then(doc => {
      return dispatch(loadEmployeeProfileSuccess(doc.data()))
    }).catch(err => {
      console.error(err);
      return dispatch(loadEmployeeProfileFailure("Failed to load employee profile"))
    })
}


export const updateProfile = (payload, employeeID, modifiedProfile) => (dispatch, getState) => {
  dispatch(updateProfileRequest());
  return make_API_call("put", `/employee/${employeeID}/updateprofile`, payload)
    .then((res) => {
      successMsg(res.message)
      return dispatch(updateProfileSuccess(modifiedProfile));
    })
    .catch((err) => {
      console.log(err);
      errorMsg(err.message)
      dispatch(updateProfileFailure("Failed to update profile"));
    });
};
