import {
  setCompanyDetails,
  loadCompanyDetailsReq,
  loadCompanyDetailsSuccess,
  loadCompanyDetailsFailure
} from '../actions/actionCreators'
import make_API_call from "../../../providers/REST_API"
import {
  stopWaitMsg,
  errorMsg,
  successMsg,
  waitingMsg,
} from "../../../shared/SnackBars/index"
import firestore from "@react-native-firebase/firestore"

export function uploadCompanyDetails(name, value) {
  return (dispatch, getState) => {
    const initState = getState().console.companyDetails
    if (!name.includes("-")) {
      const data = {
        ...initState,
        [name]: value,
      }
      dispatch(setCompanyDetails(data))
    } else {
      const words = name.split("-")
      const word1 = words[0]
      const word2 = words[1]
      const data = {
        ...initState,
        [word1]: {
          ...initState[word1],
          [word2]: value,
        },
      }
      dispatch(setCompanyDetails(data))
    }
  }
}

export function submitCompanyDetails() {
  return (dispatch, getState) => {
    waitingMsg("Updating company details...")
    const payload = getState().console.companyDetails
    make_API_call("put", "/console/companydetails/edit", payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}


export const loadCompanyDetails = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadCompanyDetailsReq())
  return firestore().collection("COMPANY_CONFIG").doc("details")
    .get()
    .then(doc => {
      const info = doc.data()
      return dispatch(loadCompanyDetailsSuccess(info))
    }).catch(err => {
      console.error(err);
      return dispatch(loadCompanyDetailsFailure("Failed to load company details"))
    })
}