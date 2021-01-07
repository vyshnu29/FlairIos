import axios from "axios"
import {
  setListener,
  setStateAction,
  unSubscribeListenerAction,
  loadAllProjectsFailure,
  loadAllProjectsRequest,
  loadAllProjectsSuccess,
  loadClosedProjectsFailure,
  loadClosedProjectsRequest,
  loadClosedProjectsSuccess,
  loadInProgressProjectsFailure,
  loadInProgressProjectsRequest,
  loadInProgressProjectsSuccess,
  loadOverDueProjectsFailure,
  loadOverDueProjectsRequest,
  loadOverDueProjectsSuccess,
  loadProjectRequest,
  loadProjectSuccess,
  loadProjectFailure,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import firestore from '@react-native-firebase/firestore';
import { JSutils } from "../../../shared/JSutils"
import make_API_call from "../../../providers/REST_API"

export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const projectsListState = getState().projects.projectsList
 // const unsubscribe = projectsListState[type].listener
  const unsubscribe = firestore()
  return dispatch(unSubscribeListenerAction({ type }))
}
export const loadAllProjects = () => (dispatch, getState, { getFirebase }) => {
  dispatch(loadAllProjectsRequest())
  const subscribe = getFirebase()
  firestore().collection("PROJECTS")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "cid"
        )
        return dispatch(loadAllProjectsSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load All Projects List"
        errorMsg(msg)
        return dispatch(loadAllProjectsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "allProjects"))
}

export const loadOverDueProjects = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadOverDueProjectsRequest())
 
  let num = Date.parse(new Date())
  console.log(num)
  const subscribe = getFirebase()
    firestore().collection("PROJECTS")
    .where("isExist", "==", true)
    // .where("enddate", "!=", "")
    .where("status", "==", "Open")
    .where("enddate", "<", num)
    //.where("startdate", "<", num)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "cid"
        )
        return dispatch(loadOverDueProjectsSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load OverDue Projects List"
        errorMsg(msg)
        return dispatch(loadOverDueProjectsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "overDueProjects"))
}

export const loadInProgressProjects = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadInProgressProjectsRequest())
  const subscribe = getFirebase()
    firestore().collection("PROJECTS")
    .where("isExist", "==", true)
    .where("status", "==", "Open")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "cid"
        )
        return dispatch(loadInProgressProjectsSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load InProgress Projects List"
        errorMsg(msg)
        return dispatch(loadInProgressProjectsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "inProgressProjects"))
}

export const loadClosedProjects = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadClosedProjectsRequest())
  const subscribe = getFirebase()
    firestore().collection("PROJECTS")
    .where("isExist", "==", true)
    .where("status", "==", "Closed")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "cid"
        )
        return dispatch(loadClosedProjectsSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load Closed Projects List"
        errorMsg(msg)
        return dispatch(loadClosedProjectsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "closedProjects"))
}

export const loadProject = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadProjectRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore().collection("PROJECTS")
    .doc(projectID)
    .onSnapshot(
      (snap) => {
        const data = snap.data()
        return dispatch(loadProjectSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  Project"
        errorMsg(msg)
        return dispatch(loadProjectFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "projectData"))
}
