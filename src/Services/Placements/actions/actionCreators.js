import ACTION from "./actionTypes"

export function reuqestPlacementList() {
  return {
    type: ACTION.PLACEMENTLIST_REQUEST,
  }
}

export function placementListSuccess(payload) {
  return {
    type: ACTION.PLACEMENTLIST_SUCCESS,
    payload,
  }
}

export function placementListFailure(error) {
  return {
    type: ACTION.PLACEMENTLIST_FAILURE,
    error,
  }
}

export function documentsRequest() {
  return {
    type: ACTION.DOCUMENTS_REQUEST,
  }
}

export function documentsSuccess(payload) {
  return {
    type: ACTION.DOCUMENTS_SUCCESS,
    payload,
  }
}

export function documentsFailure(error) {
  console.error(error)
  return {
    type: ACTION.DOCUMENTS_FAILURE,
    error,
  }
}

export function locationsRequest() {
  return {
    type: ACTION.LOCATIONS_REQUEST,
  }
}

export function locationsSuccess(payload) {
  return {
    type: ACTION.LOCATIONS_SUCCESS,
    payload,
  }
}

export function locationsFailure(error) {
  console.error(error)
  return {
    type: ACTION.LOCATIONS_FAILURE,
    error,
  }
}
