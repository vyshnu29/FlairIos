import ACTION from "../actions/actionTypes"
import { initState } from "./geoLocationState"

export function geoStateReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        isLoaded: true,
        isEmpty: false,
        error: null,
      }

    case ACTION.COUNTRIES_FAILURE:
      return {
        ...state,
        countries: [],
        isLoaded: true,
        isEmpty: true,
        error: action.err,
      }

    case ACTION.COUNTRIES_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    default:
      return state
  }
}
