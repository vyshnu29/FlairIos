import { errorMsg, waitingMsg, stopWaitMsg, successMsg } from "../../../shared/SnackBars/index"
import axios from "axios"
import { locationsFailure, locationsRequest, locationsSuccess } from "../actions/actionCreators"
// import {
//   documentsFailure,
//   documentsRequest,
//   documentsSuccess,
// } from "../actions/actionCreators"
import firestore from '@react-native-firebase/firestore'

export function initiateNewPlacement(payload, history) {
  return (dispatch) => {
    waitingMsg("Placement initiating...")
    const {
      clientId,
      description,
      jobTitle,
      netTerms,
      startDate,
      endDate,
      projectEndDate,
      employeeID,
    } = payload

    const newPlacementInputs = {
      clientId,
      description,
      jobTitle,
      netTerms,
      startDate,
      endDate,
      projectEndDate,
      employeeID,
    }
    Object.entries(newPlacementInputs).forEach(([key, value]) => {
      if (!value) {
        stopWaitMsg()
        return () => errorMsg("Please fill all the required fields")
      }
    })

    axios
      .post(`/employees/${newPlacementInputs.employeeID}/placements/new`, newPlacementInputs)
      .then((response) => {
        console.log(response.data)
        stopWaitMsg()
        successMsg(response.data.message)
        history.push(
          `/console/placements/${newPlacementInputs.employeeID}/${response.data.placementID}`
        )
      })
      .catch((err) => {
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}

export function addSectionToPlacement(payload, sectionName, uid, placementID, callback) {
  return (dispatch) => {
    waitingMsg("Creating...")
    axios
      .post(`/employees/${uid}/placements/${placementID}/addsection?name=${sectionName}`, payload)
      .then((response) => {
        stopWaitMsg()
        console.log(response)
        successMsg(response.data.message)
        callback()
      })
      .catch((err) => {
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}

export function updatePlacement(payload, sectionName, uid, placementID, callback) {
  return (dispatch) => {
    waitingMsg(`Updating ${sectionName}...`)
    axios
      .put(
        `/employees/${uid}/placements/${placementID}/updateplacement?name=${sectionName}`,
        payload
      )
      .then((response) => {
        console.log(response)
        stopWaitMsg()
        successMsg(response.data.message)
        callback()
      })
      .catch((err) => {
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}

export function deletePlacement(placementID, uid) {
  return (dispatch) => {
    waitingMsg(`Deleting ${placementID}...`)
    axios
      .delete(`/employees/${uid}/placements/${placementID}/delete`)
      .then((response) => {
        console.log(response)
        stopWaitMsg()
        successMsg(response.data.message)
      })
      .catch((err) => {
        console.error(err)
        stopWaitMsg()
        errorMsg(err.response.data.message)
      })
  }
}

export function getLocations(clientId) {
  return function (dispatch, getState, { getFirebase }) {
    dispatch(locationsRequest())
    const firebase = getFirebase()
      firestore()
      .collectionGroup("CLIENTS_LOCATIONS")
      .where("isExist", "==", true)
      .where("clientId", "==", clientId)
      .get()
      .then((snap) => {
        if (snap.size < 1) return dispatch(locationsFailure(null))
        return dispatch(locationsSuccess(snap.docs.map((doc) => doc.data())))
      })
      .catch((err) => {
        console.error(err)
        return dispatch(locationsFailure(err))
      })
  }
}
