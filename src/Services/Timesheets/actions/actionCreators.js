import ACTION from "./actionTypes"

export const loadPlacementReq = () => {
  return {
    type: ACTION.LOAD_PLACEMENT_REQ
  }
}

export const loadPlacementSuccess = (payload) => {
  return {
    type: ACTION.LOAD_PLACEMENT_SUCCESS,
    payload
  }
}

export const loadTimesheetSettingsSuccess = (payload) => {
  return {
    type: ACTION.LOAD_TIMESHEET_SETTINGS_SUCCESS,
    payload
  }
}

export const loadExistingTimesheetData = (payload) => {
  return {
    type: ACTION.LOAD_EXISTING_TIMESHEET_DATA,
    payload
  }
}

export const notifyDefaulterReq = (payload) => ({
  type: ACTION.NOTIFY_DEFAULTER_REQ,
  payload
})

export const notifyDefaulterSuccess = (payload) => ({
  type: ACTION.NOTIFY_DEFAULTER_SUCCESS,
  payload
})

export const notifyDefaulterFailure = (payload) => ({
  type: ACTION.NOTIFY_DEFAULTER_FAILURE,
  payload
})