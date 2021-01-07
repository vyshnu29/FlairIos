import { ACTION } from "../actions/actionTypes"
import initialState from "../state/payrollList"


export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ACTION.SET_STATE:
      return {
        ...state,
        ...payload
      }

    case ACTION.SET_LISTENER:
      return {
        ...state,
        listener: payload
      }

    case ACTION.UNSET_LISTENER:
      return {
        ...state,
        listener: () => { }
      }

    case ACTION.LOAD_PAYROLL_LIST_REQ:
      return {
        ...state,
        payrolls: {
          isLoading: true,
          data: {},
          error: ""
        },
      }

    case ACTION.LOAD_PAYROLL_LIST_SUCCESS:
      return {
        ...state,
        payrolls: {
          isLoading: false,
          data: payload,
          error: ""
        },
      }

    case ACTION.LOAD_PAYROLL_LIST_FAILURE:
      return {
        ...state,
        payrolls: {
          isLoading: false,
          data: {},
          error: payload
        },
      }

    case ACTION.LOAD_PAYROLL_SETTINGS_REQ:
      return {
        ...state,
        payrollSettings: {
          isLoading: true,
          data: {},
          error: ""
        }
      }

    case ACTION.LOAD_PAYROLL_SETTINGS_SUCCESS:
      return {
        ...state,
        payrollSettings: {
          isLoading: false,
          data: payload,
          error: ""
        }
      }

    case ACTION.LOAD_PAYROLL_SETTINGS_FAILURE:
      return {
        ...state,
        payrollSettings: {
          isLoading: false,
          data: {},
          error: payload
        }
      }

    case ACTION.UPDATE_PAYROLL_SETTINGS_REQ:
      return {
        ...state,
        actions: {
          ...state.actions,
          updatingPayroll: [...state.actions.updatingPayroll, payload],
          errorWhileUpdating: state.actions.errorWhileUpdating.filter(id => id !== payload)
        }
      }

    case ACTION.UPDATE_PAYROLL_SETTINGS_SUCCESS:
      return {
        ...state,
        actions: {
          ...state.actions,
          updatingPayroll: state.actions.updatingPayroll.filter(id => id !== payload),
          errorWhileUpdating: state.actions.errorWhileUpdating.filter(id => id !== payload)
        }
      }

    case ACTION.UPDATE_PAYROLL_SETTINGS_FAILURE:
      return {
        ...state,
        actions: {
          ...state.actions,
          updatingPayroll: state.actions.updatingPayroll.filter(id => id !== payload),
          errorWhileUpdating: [...state.actions.errorWhileUpdating, payload]
        }
      }

    case ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_REQ:
      return {
        ...state,
        actions: {
          ...state.actions,
          generatingPayroll: [...state.actions.generatingPayroll, payload],
          errorWhileGenerating: state.actions.errorWhileGenerating.filter(id => id !== payload)
        }
      }

    case ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_SUCCESS:
      return {
        ...state,
        actions: {
          ...state.actions,
          generatingPayroll: state.actions.generatingPayroll.filter(id => id !== payload),
          errorWhileGenerating: state.actions.errorWhileGenerating.filter(id => id !== payload)
        }
      }

    case ACTION.GENERATE_PAYROLL_FOR_EMPLOYEE_FAILURE:
      return {
        ...state,
        actions: {
          ...state.actions,
          generatingPayroll: state.actions.generatingPayroll.filter(id => id !== payload),
          errorWhileGenerating: [...state.actions.errorWhileGenerating, payload]
        }
      }

    default:
      return state
  }
}
