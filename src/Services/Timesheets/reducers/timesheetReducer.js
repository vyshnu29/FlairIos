import ACTION from "../actions/actionTypes"
import initState from "../states/timesheetState"

export default function timesheetReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.LOAD_PLACEMENT_REQ:
      return {
        ...state,
        gettingPlacementInfo: true
      }

    case ACTION.LOAD_PLACEMENT_SUCCESS:
      return {
        ...state,
        gettingPlacementInfo: false,
        placement: action.payload
      }

    case ACTION.LOAD_PLACEMENT_FAILURE:
      return {
        ...state,
        gettingPlacementInfo: false
      }

    case ACTION.LOAD_TIMESHEET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings_info: state.settings_info !== null ? {
          ...state.settings_info,
          ...action.payload
        } : action.payload
      }

    case ACTION.LOAD_EXISTING_TIMESHEET_DATA:
      return {
        ...state,
        loadExistingTimesheetInfo: {
          ...state.loadExistingTimesheetInfo,
          ...action.payload
        }
      }

    default: return state
  }

}