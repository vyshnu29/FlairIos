import ACTION from "../actions/dynamicProfileRenderActions"
import initialState from "../state/dynamicProfileRender"
import MAIN_ACTIONS from "../actions/actionTypes"
export default (state = initialState, { type, payload }) => {
  switch (type) {

    case MAIN_ACTIONS.SET_STATE:
      return {
        ...state,
        ...payload
      }

    case ACTION.LOAD_PROFILE_TEMPLATE_REQ:
      return {
        ...state,
        profileTemplate: {
          isLoading: true,
          data: {},
          error: ""
        },
      }

    case ACTION.LOAD_PROFILE_TEMPLATE_SUCCESS:
      return {
        ...state,
        profileTemplate: {
          isLoading: false,
          data: payload,
          error: ""
        },
      }

    case ACTION.LOAD_PROFILE_TEMPLATE_FAILURE:
      return {
        ...state,
        profileTemplate: {
          isLoading: false,
          data: {},
          error: payload
        },
      }

    case ACTION.LOAD_EMPLOYEE_PROFILE_REQ:
      return {
        ...state,
        employeeProfile: {
          isLoading: true,
          data: {},
          error: "",
          isUpdating: false,
          errorWhileUpdating: ""
        }
      }

    case ACTION.LOAD_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        employeeProfile: {
          isLoading: false,
          data: payload,
          error: "",
          isUpdating: false,
          errorWhileUpdating: ""
        }
      }

    case ACTION.LOAD_EMPLOYEE_PROFILE_FAILURE:
      return {
        ...state,
        employeeProfile: {
          isLoading: false,
          data: {},
          error: payload,
          isUpdating: false,
          errorWhileUpdating: ""
        }
      }

    case ACTION.UPDATE_EMPLOYEE_PROFILE_REQUEST:
      return {
        ...state,
        employeeProfile: {
          ...state.employeeProfile,
          isUpdating: true,
          errorWhileUpdating: ""
        }
      }

    case ACTION.UPDATE_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        employeeProfile: {
          ...state.employeeProfile,
          data: {
            ...state.employeeProfile.data,
            ...payload
          },
          isUpdating: false,
          errorWhileUpdating: ""
        },
        editingSection: initialState.editingSection
      }

    case ACTION.UPDATE_EMPLOYEE_PROFILE_FAILURE:
      return {
        ...state,
        employeeProfile: {
          ...state.employeeProfile,
          isUpdating: false,
          errorWhileUpdating: payload
        }
      }





    default:
      return state
  }
}
