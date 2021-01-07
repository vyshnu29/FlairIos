import ACTION from "../actions/actionTypes"
import initState from "./employeeListState"

export default (state = initState, { type, payload }) => {
  switch (type) {
    case ACTION.SET_STATE:
      return {
        ...state,
        ...payload,
      }

    case ACTION.SET_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: payload.listener,
        },
      }

    case ACTION.UNSUBSCRIBE_LISTENER:
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          listener: () => {},
        },
      }
    case ACTION.LOAD_ALL_EMPLOYEES_REQUEST:
      return {
        ...state,
        allEmployees: {
          ...state.allEmployees,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        allEmployees: {
          ...state.allEmployees,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.allEmployees.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ALL_EMPLOYEES_FAILURE:
      return {
        ...state,
        allEmployees: {
          ...state.allEmployees,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_ACTIVE_EMPLOYEES_REQUEST:
      return {
        ...state,
        activeEmployees: {
          ...state.activeEmployees,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_ACTIVE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        activeEmployees: {
          ...state.activeEmployees,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.activeEmployees.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_ACTIVE_EMPLOYEES_FAILURE:
      return {
        ...state,
        activeEmployees: {
          ...state.activeEmployees,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_INACTIVE_EMPLOYEES_REQUEST:
      return {
        ...state,
        inActiveEmployees: {
          ...state.inActiveEmployees,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_INACTIVE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        inActiveEmployees: {
          ...state.inActiveEmployees,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.inActiveEmployees.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_INACTIVE_EMPLOYEES_FAILURE:
      return {
        ...state,
        inActiveEmployees: {
          ...state.inActiveEmployees,
          isLoading: false,
          error: payload,
        },
      }

    case ACTION.LOAD_SUSPENDED_EMPLOYEES_REQUEST:
      return {
        ...state,
        suspendedEmployees: {
          ...state.suspendedEmployees,
          isLoading: true,
          error: "",
        },
      }

    case ACTION.LOAD_SUSPENDED_EMPLOYEES_SUCCESS:
      return {
        ...state,
        suspendedEmployees: {
          ...state.suspendedEmployees,
          isLoading: false,
          data: payload,
          error: "",
          noOfLoadings: state.suspendedEmployees.noOfLoadings + 1,
        },
      }

    case ACTION.LOAD_SUSPENDED_EMPLOYEES_FAILURE:
      return {
        ...state,
        suspendedEmployees: {
          ...state.suspendedEmployees,
          isLoading: false,
          error: payload,
        },
      }

    default:
      return state
  }
}
