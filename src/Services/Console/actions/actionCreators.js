import ACTION from "./actionTypes"

export function setCompanyDetails(payload) {
  return {
    type: ACTION.SET_COMPANY_DETAILS,
    payload,
  }
}

export const loadCompanyDetailsReq = () => ({
  type: ACTION.LOAD_COMPANY_DETAILS_REQ,
})

export const loadCompanyDetailsSuccess = (payload) => ({
  type: ACTION.LOAD_COMPANY_DETAILS_SUCCESS,
  payload
})

export const loadCompanyDetailsFailure = (payload) => ({
  type: ACTION.LOAD_COMPANY_DETAILS_FAILURE,
  payload
})

