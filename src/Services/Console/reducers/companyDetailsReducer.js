import ACTION from "../actions/actionTypes"
import { initState } from "./companyDetailsState"

export function companyDetailsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.SET_COMPANY_DETAILS:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION.LOAD_COMPANY_DETAILS_REQ:
      return {
        ...state,
        isLoading: true,
        error: ""
      }

    case ACTION.LOAD_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }

    case ACTION.LOAD_COMPANY_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
