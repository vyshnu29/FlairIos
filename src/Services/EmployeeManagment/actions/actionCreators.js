import ACTION from "../actions/actionTypes";


export const setStateAction = (payload) => ({
  type: ACTION.SET_STATE,
  payload,
})

export const setListener = (listener, type) => ({
  type: ACTION.SET_LISTENER,
  payload: {
    listener,
    type,
  },
})
export const unSubscribeListenerAction = (payload) => ({
  type: ACTION.UNSUBSCRIBE_LISTENER,
  payload,
})


export function modulesRequest() {
  return {
    type: ACTION.MODULES_REQUEST,
  };
}

export function modulesSuccess(payload) {
  return {
    type: ACTION.MODULES_SUCCESS,
    payload,
  };
}

export function modulesFailure(error) {
  return {
    type: ACTION.MODULES_FAILURE,
    error,
  };
}

export function allModulesRequest() {
  return {
    type: ACTION.ALL_MODULES_REQUEST,
  };
}

export function allModulesSuccess(payload) {
  return {
    type: ACTION.ALL_MODULES_SUCCESS,
    payload,
  };
}

export function allModulesFailure(error) {
  return {
    type: ACTION.ALL_MODULES_FAILURE,
    error,
  };
}

export function employeesRequest() {
  return {
    type: ACTION.EMPLOYEES_REQUEST,
  };
}

export function employeesSuccess(payload) {
  return {
    type: ACTION.EMPLOYEES_SUCCESS,
    payload,
  };
}

export function employeesFailure(error) {
  return {
    type: ACTION.EMPLOYEES_FAILURE,
    error,
  };
}

export function inviteEmployeeRequest() {
  return {
    type: ACTION.INVITE_EMPLOYEE_REQUEST,
  };
}

export function inviteEmployeeSuccess() {
  return {
    type: ACTION.INVITE_EMPLOYEE_SUCCESS,
  };
}

export function inviteEmployeeError(error) {
  return {
    type: ACTION.INVITE_EMPLOYEE_FAILURE,
    error,
  };
}

export function setExcelInvites(payload) {
  return {
    type: ACTION.SET_EXCEL_INVITES,
    payload,
  };
}

export function employeeRegistrationRequest() {
  return {
    type: ACTION.EMPLOYEE_REGISTRATION_REQUEST,
  };
}

export function employeeRegistrationSuccess(payload) {
  return {
    type: ACTION.EMPLOYEE_REGISTRATION_SUCCESS,
    payload,
  };
}

export function employeeRegistrationFailure(error) {
  return {
    type: ACTION.EMPLOYEE_REGISTRATION_FAILURE,
    error,
  };
}

export const loadEmployeeProfileRequest = () => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_REQUEST,
});

export const loadEmployeeProfileSuccess = (payload) => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_SUCCESS,
  payload,
});

export const loadEmployeeProfileFailure = (payload) => ({
  type: ACTION.LOAD_EMPLOYEE_PROFILE_FAILURE,
  payload,
});

export const updateProfileRequest = () => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_REQUEST,
});

export const updateProfileSuccess = () => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_SUCCESS,
});

export const updateProfileFailure = (payload) => ({
  type: ACTION.UPDATE_EMPLOYEE_PROFILE_FAILURE,
  payload,
});

export const enableEmployeeRequest = () => ({
  type: ACTION.ENABLE_EMPLOYEE_REQUEST,
})

export const enableEmployeeSuccess = () => ({
  type: ACTION.ENABLE_EMPLOYEE_SUCCESS,
})

export const enableEmployeeFailure = (payload) => ({
  type: ACTION.ENABLE_EMPLOYEE_FAILURE,
  payload,
})

export const suspendEmployeeRequest = () => ({
  type: ACTION.SUSPEND_EMPLOYEE_REQUEST,
})

export const suspendEmployeeSuccess = () => ({
  type: ACTION.SUSPEND_EMPLOYEE_SUCCESS,
})

export const suspendEmployeeFailure = (payload) => ({
  type: ACTION.SUSPEND_EMPLOYEE_FAILURE,
  payload,
})


export function loadAllEmployeesRequest() {
  return {
    type: ACTION.LOAD_ALL_EMPLOYEES_REQUEST,
  }
}

export function loadAllEmployeesSuccess(payload) {
  return {
    type: ACTION.LOAD_ALL_EMPLOYEES_SUCCESS,
    payload,
  }
}

export function loadAllEmployeesFailure(payload) {
  return {
    type: ACTION.LOAD_ALL_EMPLOYEES_FAILURE,
    payload,
  }
}

export function loadActiveEmployeesRequest() {
  return {
    type: ACTION.LOAD_ACTIVE_EMPLOYEES_REQUEST,
  }
}

export function loadActiveEmployeesSuccess(payload) {
  return {
    type: ACTION.LOAD_ACTIVE_EMPLOYEES_SUCCESS,
    payload,
  }
}

export function loadActiveEmployeesFailure(payload) {
  return {
    type: ACTION.LOAD_ACTIVE_EMPLOYEES_FAILURE,
    payload,
  }
}

export function loadInActiveEmployeesRequest() {
  return {
    type: ACTION.LOAD_INACTIVE_EMPLOYEES_REQUEST,
  }
}

export function loadInActiveEmployeesSuccess(payload) {
  return {
    type: ACTION.LOAD_INACTIVE_EMPLOYEES_SUCCESS,
    payload,
  }
}

export function loadInActiveEmployeesFailure(payload) {
  return {
    type: ACTION.LOAD_INACTIVE_EMPLOYEES_FAILURE,
    payload,
  }
}

export function loadSuspendedEmployeesRequest() {
  return {
    type: ACTION.LOAD_SUSPENDED_EMPLOYEES_REQUEST,
  }
}

export function loadSuspendedEmployeesSuccess(payload) {
  return {
    type: ACTION.LOAD_SUSPENDED_EMPLOYEES_SUCCESS,
    payload,
  }
}

export function loadSuspendedEmployeesFailure(payload) {
  return {
    type: ACTION.LOAD_SUSPENDED_EMPLOYEES_FAILURE,
    payload,
  }
}

export function loadInvitationEmailRequest() {
  return {
    type: ACTION.LOAD_INVITATION_EMAIL_REQUEST,
  }
}

export function loadInvitationEmailSuccess(payload) {
  return {
    type: ACTION.LOAD_INVITATION_EMAIL_SUCCESS,
    payload,
  }
}

export function loadInvitationEmailFailure(payload) {
  return {
    type: ACTION.LOAD_INVITATION_EMAIL_FAILURE,
    payload,
  }
}

export function loadInvitatedEmpInfoRequest() {
  return {
    type: ACTION.LOAD_INVITATED_EMPIFNO_REQUEST,
  }
}

export function loadInvitatedEmpInfoSuccess(payload) {
  return {
    type: ACTION.LOAD_INVITATED_EMPIFNO_SUCCESS,
    payload,
  }
}

export function loadInvitatedEmpInfoFailure(payload) {
  return {
    type: ACTION.LOAD_INVITATED_EMPIFNO_FAILURE,
    payload,
  }
}