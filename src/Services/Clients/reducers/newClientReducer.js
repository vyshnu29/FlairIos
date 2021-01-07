import ACTION from "../actions/actionTypes"
import initState from "./newClientState"

export function newClientReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.SET_NEW_CLIENT_BUSINESS_INFORMATION:
      return {
        ...state,
        businessInformation: action.payload,
      }

    case ACTION.SET_NEW_CLIENT_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      }

    case ACTION.SET_NEW_CLIENT_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      }

    case ACTION.SET_NEW_CLIENT_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      }

    default:
      return state
  }
}
