import ACTION from "./dynamicProfileRenderActions"

export const loadProfileTemplateReq = () => ({
  type: ACTION.LOAD_PROFILE_TEMPLATE_REQ
})

export const loadProfileTemplateSuccess = (payload) => ({
  type: ACTION.LOAD_PROFILE_TEMPLATE_SUCCESS,
  payload
})

export const loadProfileTemplateFailure = (payload) => ({
  type: ACTION.LOAD_PROFILE_TEMPLATE_FAILURE,
  payload
})

export const loadEmployeeProfileReq = () => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_REQ
})

export const loadEmployeeProfileSuccess = (payload) => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_SUCCESS,
  payload
})

export const loadEmployeeProfileFailure = (payload) => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_FAILURE,
  payload
})

export const updateProfileRequest = () => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_REQUEST,
});

export const updateProfileSuccess = (payload) => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_SUCCESS,
  payload
});

export const updateProfileFailure = (payload) => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_FAILURE,
  payload,
});
