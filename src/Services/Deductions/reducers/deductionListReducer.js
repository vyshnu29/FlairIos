import { ACTION } from "../actions/actionTypes"
import { initState } from "./deductionListState"

export const deductionListReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION.DEDUCTIONLIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.DEDUCTIONLIST_SUCCESS:
      return {
        ...state,
        deductions: action.payload,
        isLoaded: true,
        isEmpty: false,
        error: null,
      }

    case ACTION.DEDUCTIONLIST_ERROR:
      return {
        ...state,
        deductions: [],
        isLoaded: true,
        isEmpty: false,
        error: action.err,
      }

    default:
      return state
  }
}
