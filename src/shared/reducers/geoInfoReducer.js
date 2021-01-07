import { ACTION } from "../actions/actionTypes"
import { initstate } from "./geoInfoState"

export function geoInfoReducer(state = initstate, action) {
  switch (action.type) {
    case ACTION.REQUEST_COUNTRIES:
      return {
        ...state,
        countries: {
          ...state.countries,
          isLoaded: false,
          isEmpty: false,
        },
      }

    case ACTION.RECEIVE_COUNTRIES:
      return {
        ...state,
        countries: {
          ...state.countries,
          isLoaded: true,
          isEmpty: false,
          error: null,
          list: action.payload,
        },
      }

    case ACTION.ERROR_COUNTRIES:
      return {
        ...state,
        countries: {
          ...state.countries,
          isLoaded: true,
          isEmpty: true,
          error: action.err,
          list: [],
        },
      }

    case ACTION.REQUEST_STATES:
      return {
        ...state,
        states: {
          ...state.states,
          isLoaded: false,
          isEmpty: false,
        },
      }

    case ACTION.RECEIVE_STATES:
      return {
        ...state,
        states: {
          ...state.states,
          isLoaded: true,
          isEmpty: false,
          error: null,
          list: action.payload,
        },
      }

    case ACTION.ERROR_STATES:
      return {
        ...state,
        states: {
          ...state.states,
          isLoaded: true,
          isEmpty: true,
          error: action.err,
          list: [],
        },
      }

    default:
      return state
  }
}
