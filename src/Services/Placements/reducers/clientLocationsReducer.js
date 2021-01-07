import ACTION from "../actions/actionTypes"
import { initState } from "./clientLocationsState"

export function clientLocationsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.LOCATIONS_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isEmpty: false,
      }

    case ACTION.LOCATIONS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        client_locations: action.payload,
        error: null,
      }

    case ACTION.LOCATIONS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
        client_locations: [],
        error: action.err,
      }

    default:
      return state
  }
}
