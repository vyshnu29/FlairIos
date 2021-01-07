import { ACTION } from "./actionTypes"

export const setState = (payload) => ({
  type: ACTION.SET_STATE,
  payload
})

export const setListener = (payload) => ({
  type: ACTION.SET_LISTENER,
  payload
})

export const unsetListener = () => ({
  type: ACTION.UNSET_LISTENER,
})




export const loadPayrollListReq = () => ({
  type: ACTION.LOAD_PAYROLL_LIST_REQ
})

export const loadPayrollListSuccess = (payload) => ({
  type: ACTION.LOAD_PAYROLL_LIST_SUCCESS,
  payload
})

export const loadPayrollListFailure = (payload) => ({
  type: ACTION.LOAD_PAYROLL_LIST_FAILURE,
  payload
})

export const loadPayrollSettingsReq = (payload) => ({
  type: ACTION.LOAD_PAYROLL_SETTINGS_REQ,
  payload
})

export const loadPayrollSettingsSuccess = (payload) => ({
  type: ACTION.LOAD_PAYROLL_SETTINGS_SUCCESS,
  payload
})

export const loadPayrollSettingsFailure = (payload) => ({
  type: ACTION.LOAD_PAYROLL_SETTINGS_FAILURE,
  payload
})

export const updatePayrollSettingsReq = (payload) => ({
  type: ACTION.UPDATE_PAYROLL_SETTINGS_REQ,
  payload
})

export const updatePayrollSettingsSuccess = (payload) => ({
  type: ACTION.UPDATE_PAYROLL_SETTINGS_SUCCESS,
  payload
})

export const updatePayrollSettingsFailure = (payload) => ({
  type: ACTION.UPDATE_PAYROLL_SETTINGS_FAILURE,
  payload
})

export const generatePayrollForEmployeeReq = (payload) => ({
  type: ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_REQ,
  payload
})

export const generatePayrollForEmployeeSuccess = (payload) => ({
  type: ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_SUCCESS,
  payload
})

export const generatePayrollForEmployeeFailure = (payload) => ({
  type: ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_FAILURE,
  payload
})





