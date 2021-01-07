import initState from "./employeeModulesState"
import ACTION from "../actions/actionTypes"

export function employeeModulesReducer(state = initState, action) {
	switch (action.type) {
    case ACTION.MODULES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case ACTION.MODULES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        accessModules: action.payload.accessModules,
      }

    case ACTION.MODULES_FAILURE:
      return {
        ...state,
        isFetching: false,
        accessModules: [],
        error: action.error,
      }

    case ACTION.ALL_MODULES_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.ALL_MODULES_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        allModules: action.payload.allModules,
      }

    case ACTION.ALL_MODULES_FAILURE:
      return {
        ...state,
        allModules: [],
        error: action.error,
        isLoaded: true,
        isEmpty: true,
      }
    default:
      return state
  }
}
