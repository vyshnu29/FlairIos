import ACTION from "./actionTypes"

export function countriesRequest() {
  return {
    type: ACTION.COUNTRIES_REQUEST,
  }
}

export function countriesError(err) {
  return {
    type: ACTION.COUNTRIES_FAILURE,
    err,
  }
}

export function countriesSuccess(payload) {
  return {
    type: ACTION.COUNTRIES_SUCCESS,
    payload,
  }
}

export function setBusinessInformation(payload) {
  return {
    type: ACTION.SET_NEW_CLIENT_BUSINESS_INFORMATION,
    payload,
  }
}

export function setContactsInformation(payload) {
  return {
    type: ACTION.SET_NEW_CLIENT_CONTACTS,
    payload,
  }
}

export function setAccountsInformation(payload) {
  return {
    type: ACTION.SET_NEW_CLIENT_ACCOUNTS,
    payload,
  }
}

export function setLocationsInformation(payload) {
  return {
    type: ACTION.SET_NEW_CLIENT_LOCATIONS,
    payload,
  }
}
