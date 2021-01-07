import axios from "axios"
import {
  setListener,
  setStateAction,
  unSubscribeListenerAction,
  loadTaskRequest,
  loadTaskFailure,
  loadTaskSuccess,
  loadTasksListFailure,
  loadTasksListRequest,
  loadTasksListSuccess,
  loadTaskCommentsFailure,
  loadTaskCommentsRequest,
  loadTaskCommentsSuccess,
  loadAllTasksRequest,
  loadAllTasksFailure,
  loadAllTasksSuccess,
  loadClosedTasksFailure,
  loadClosedTasksRequest,
  loadClosedTasksSuccess,
  loadOverDueTasksRequest,
  loadOverDueTasksFailure,
  loadOverDueTasksSuccess,
  loadReviewTasksFailure,
  loadReviewTasksRequest,
  loadReviewTasksSuccess,
  loadInProgressTasksFailure,
  loadInProgressTasksRequest,
  loadInProgressTasksSuccess,
  loadSubTasksFailure,
  loadSubTasksRequest,
  loadSubTasksSuccess,
  loadOpenTasksFailure,
  loadOpenTasksRequest,
  loadOpenTasksSuccess,
  loadInProgressProjectsFailure,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import { JSutils } from "../../../shared/JSutils"
import firestore from '@react-native-firebase/firestore';
import make_API_call from "../../../providers/REST_API"

export const setState = (obj) => (dispatch) => {
  return dispatch(setStateAction(obj))
}

export const unSubscribeListener = (type) => (dispatch, getState) => {
  const tasksListState = getState().projects.LoadedTasksList
  //const unsubscribe = tasksListState[type].listener
  const unsubscribe = firestore()
  return dispatch(unSubscribeListenerAction({ type }))
}

export const loadTask = (payload) => (dispatch, getState, { getFirebase }) => {
  dispatch(loadTaskRequest())
  const { taskID, projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .doc(taskID)
    .onSnapshot(
      (snap) => {
        const data = snap.data()
        return dispatch(loadTaskSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  Task"
        errorMsg(msg)
        return dispatch(loadTaskFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "taskData"))
}

export const loadTasksList = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadTasksListRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadTasksListSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  TasksList"
        errorMsg(msg)
        return dispatch(loadTasksListFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "tasksListData"))
}

export const loadTaskComments = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadTaskCommentsRequest())
  const { taskID, projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .doc(taskID)
    .collection("TASK_COMMENTS")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadTaskCommentsSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  Task comments"
        errorMsg(msg)
        return dispatch(loadTaskCommentsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "taskCommentsData"))
}


export const loadAllTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadAllTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadAllTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  All Tasks"
        errorMsg(msg)
        return dispatch(loadAllTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "allTasksList"))
}

export const loadOpenTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadOpenTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("status", "==", "Open")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadOpenTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  Open Tasks"
        errorMsg(msg)
        return dispatch(loadOpenTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "openTasksList"))
}

export const loadInProgressTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadInProgressTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("status", "==", "InProgress")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadInProgressTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  InProgress Tasks"
        errorMsg(msg)
        return dispatch(loadInProgressProjectsFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "inProgressTasksList"))
}

export const loadOverDueTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadOverDueTasksRequest())
  const { projectID } = payload

  let num = Date.parse(new Date())
  console.log(num)
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("enddate", "<", num)
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )
        return dispatch(loadOverDueTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load OverDue Tasks"
        errorMsg(msg)
        return dispatch(loadOverDueTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "overDueProjects"))
}

export const loadReviewTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadReviewTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("status", "==", "Review")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadReviewTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load  Review Tasks"
        errorMsg(msg)
        return dispatch(loadReviewTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "reviewTasksList"))
}

export const loadClosedTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadClosedTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("status", "==", "Closed")

    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadClosedTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load Closed Tasks"
        errorMsg(msg)
        return dispatch(loadClosedTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "closedTasksList"))
}

export const loadSubTasks = (payload) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(loadSubTasksRequest())
  const { projectID } = payload
  const subscribe = getFirebase()
    firestore()
    .collection("PROJECTS")
    .doc(projectID)
    .collection("TASKS")
    .where("isExist", "==", true)
    .where("category", "==", "subtask")
    .onSnapshot(
      (snap) => {
        const data = JSutils._array_to_object(
          snap.docs.map((doc) => doc.data()),
          "id"
        )

        return dispatch(loadSubTasksSuccess(data))
      },
      (err) => {
        console.error(err)
        const msg = "Failed to load Sub Tasks"
        errorMsg(msg)
        return dispatch(loadSubTasksFailure(msg))
      }
    )

  dispatch(setListener(subscribe, "subTasksList"))
}