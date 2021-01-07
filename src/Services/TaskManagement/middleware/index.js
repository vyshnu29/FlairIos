import axios from "axios"
import {
  newProjectRequest,
  newProjectSuccess,
  newProjectFailure,
  projectUpdationFailure,
  projectUpdationRequest,
  projectUpdationSuccess,
  removeMemberFailure,
  removeMemberRequest,
  removeMemberSuccess,
  createLabelsRequest,
  createLabelsSuccess,
  createLabelsFailure,
  updateLabelsRequest,
  updateLabelsSuccess,
  updateLabelsFailure,
  deleteLabelsRequest,
  deleteLabelsSuccess,
  deleteLabelsFailure,
  updatePermissionsRequest,
  updatePermissionsSuccess,
  updatePermissionsFailure,
  createTasksRequest,
  createTasksFailure,
  createTasksSuccess,
  editTasksRequest,
  editTasksFailure,
  editTasksSuccess,
  linkTasksRequest,
  linkTasksSuccess,
  linkTasksFailure,
  unLinkTasksRequest,
  unLinkTasksSuccess,
  unLinkTasksFailure,
  createSubTasksRequest,
  createSubTasksSuccess,
  createSubTasksFailure,
  addCommentsRequest,
  addCommentsSuccess,
  addCommentsFailure,
  updateCommentsRequest,
  updateCommentsSuccess,
  updateCommentsFailure,
  deleteCommentsRequest,
  deleteCommentsSuccess,
  deleteCommentsFailure,
  addMembersRequest,
  addMembersSuccess,
  addMembersFailure,
} from "../actions/actionCreators"
import {
  waitingMsg,
  stopWaitMsg,
  errorMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
// import { error } from "jquery"
//import validate from "../../../shared/validation"

export function projectCreation(payload) {
  return (dispatch) => {
    dispatch(newProjectRequest())
    //  
    const {
      title,
      status,
      startdate,
      enddate,
      useLabels,
      useTimeline,
      cid,
      Users,
    } = payload
    waitingMsg("Project is being Created...")
    axios
      .post("/projects/newproject", {
        title,
        status,
        startdate,
        enddate,
        useLabels,
        useTimeline,
        cid,
        Users,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Project has been created")
        dispatch(newProjectSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(newProjectFailure())
      })
  }
}
export function projectUpdation(payload) {
  return (dispatch) => {
    dispatch(projectUpdationRequest())
    //  
    const {
      title,
      status,
      startdate,
      enddate,
      useLabels,
      useTimeline,
      cid,
      id,
    } = payload
    waitingMsg("Project is being Updated...")
    axios
      .put("/projects/" + id + "/updateproject", {
        title,
        status,
        startdate,
        enddate,
        cid,
        useLabels,
        useTimeline,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Project has been Updated")
        dispatch(projectUpdationSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(projectUpdationFailure())
      })
  }
}

export function removeMember(payload) {
  return (dispatch) => {
    dispatch(removeMemberRequest())
    //  

    const { projectId, employees } = payload
    waitingMsg("Removing Member from project...")
    axios
      .put("/projects/" + projectId + "/removeemployee", {
        employees,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("project member removed Successfully")
        dispatch(removeMemberSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(removeMemberFailure())
      })
  }
}

export function createLabels(payload) {
  return (dispatch) => {
    dispatch(createLabelsRequest())
    //  
    const { projectId, labelName, labelColorCode } = payload
    waitingMsg("Creating the label...")
    axios
      .post("/projects/" + projectId + "/labels/newlabel", {
        labelName,
        labelColorCode,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Label created")
        dispatch(createLabelsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(createLabelsFailure())
      })
  }
}
export function updateLabels(payload) {
  return (dispatch) => {
    dispatch(updateLabelsRequest())
    //  
    const { projectId, labelName, labelColorCode, labelId } = payload
    waitingMsg("Updating the label...")
    axios
      .put("/projects/" + projectId + "/labels/" + labelId + "/update", {
        labelName,
        labelColorCode,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Label updated")
        dispatch(updateLabelsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(updateLabelsFailure())
      })
  }
}
export function deleteLabels(payload) {
  return (dispatch) => {
    dispatch(deleteLabelsRequest())
    //   
    const { projectId, id } = payload
    waitingMsg("Deleting the label...")
    axios
      .delete("/projects/" + projectId + "/labels/" + id + "/delete", {})
      .then((res) => {
        stopWaitMsg()
        successMsg("Label deleted")
        dispatch(deleteLabelsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(deleteLabelsFailure())
      })
  }
}
export function updatePermissions(payload) {
  return (dispatch) => {
    dispatch(updatePermissionsRequest())
    // 
    const { uid, projectId, create, update, read, del } = payload
    waitingMsg("Updaating the Permissions...")
    axios
      .put("/projects/" + projectId + "/updatepermissions", {
        permissionLevels: {
          uid,
          create,
          update,
          read,
          delete: del
        }
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Permissions Updated")
        dispatch(updatePermissionsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(updatePermissionsFailure())
      })
  }
}
export function createTasks(payload) {
  return (dispatch) => {
    dispatch(createTasksRequest())
    // 
    const {
      title,
      type,
      status,
      startdate,
      enddate,
      priority,
      assignee,
      description,
      setReminder,
      reminderDate,
      category,
      labels,
      id,
    } = payload
    console.log(
      title,
      type,
      status,
      startdate,
      enddate,
      priority,
      assignee,
      description,
      setReminder,
      reminderDate,
      category,
      labels,
      id
    )
    waitingMsg("creating the task...")
    axios
      .post("/projects/" + id + "/tasks/new", {
        title,
        type,
        status,
        startdate,
        enddate,
        priority,
        assignee,
        description,
        setReminder,
        reminderDate,
        category,
        labels,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Task Created")
        dispatch(createTasksSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(createTasksFailure())
      })
  }
}
export function createsubTasks(payload) {
  return (dispatch) => {
    dispatch(createSubTasksRequest())
    // 
    const {
      title,
      type,
      status,
      startdate,
      enddate,
      priority,
      assignee,
      description,
      setReminder,
      reminderDate,
      category,
      labels,
      id,
      taskId,
    } = payload
    waitingMsg("Creating the Subtask...")
    axios
      .post("/projects/" + id + "/tasks/new", {
        title,
        type,
        status,
        startdate,
        enddate,
        priority,
        assignee,
        description,
        setReminder,
        reminderDate,
        category,
        labels,
        taskId,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("SubTask Updated")
        dispatch(createSubTasksSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(createSubTasksFailure())
      })
  }
}
export function editTasks(payload) {
  return (dispatch) => {
    dispatch(editTasksRequest())
    // 
    const {
      title,
      type,
      status,
      startdate,
      enddate,
      priority,
      labels,
      assignee,
      description,
      setReminder,
      reminderDate,
      taskId,
      projectId,
    } = payload
    waitingMsg("Updating the task...")
    axios
      .put("/projects/" + projectId + "/tasks/" + taskId + "/update", {
        title,
        type,
        status,
        startdate,
        enddate,
        priority,
        labels,
        assignee,
        description,
        setReminder,
        reminderDate,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Task Updated")
        dispatch(editTasksSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(editTasksFailure())
      })
  }
}
export function linkTasks(payload) {
  return (dispatch) => {
    dispatch(linkTasksRequest())
    // 
    const { projectID, data } = payload
    waitingMsg("Linking the tasks...")
    axios
      .put(`/projects/${projectID}/tasks/link`, data)
      .then((res) => {
        stopWaitMsg()
        successMsg("Tasks Linked")
        dispatch(linkTasksSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(linkTasksFailure())
      })
  }
}
export function unLinkTasks(payload) {
  return (dispatch) => {
    dispatch(unLinkTasksRequest())
    ////  
        const { projectID, data } = payload
    waitingMsg("UnLinking the tasks...")
    axios
      .put(`/projects/${projectID}/tasks/unlink`, data)
      .then((res) => {
        stopWaitMsg()
        successMsg("Tasks UnLinked")
        dispatch(unLinkTasksSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(unLinkTasksFailure())
      })
  }
}
export function addComment(payload) {
  return (dispatch) => {
    dispatch(addCommentsRequest())
    ////  
    const { projectId, taskId, text } = payload
    waitingMsg("Commenting on tasks...")
    axios
      .post("/projects/" + projectId + "/tasks/" + taskId + "/comments/new", {
        text,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Commented")
        dispatch(addCommentsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(addCommentsFailure())
      })
  }
}

export function updateComment(payload) {
  return (dispatch) => {
    dispatch(updateCommentsRequest())
    ////  
    const { projectId, taskId, text, id } = payload
    waitingMsg("Updating comments on tasks...")
    axios
      .put(
        "/projects/" +
        projectId +
        "/tasks/" +
        taskId +
        "/comments/" +
        id +
        "/update",
        {
          text,
        }
      )
      .then((res) => {
        stopWaitMsg()
        successMsg("Comment Updated")
        dispatch(updateCommentsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(updateCommentsFailure())
      })
  }
}

export function deleteComment(payload) {
  return (dispatch) => {
    dispatch(deleteCommentsRequest())
    ////  
    const { projectId, taskId, id } = payload
    waitingMsg("Updating comments on tasks...")
    axios
      .put(
        "/projects/" +
        projectId +
        "/tasks/" +
        taskId +
        "/comments/" +
        id +
        "/delete",
        {}
      )
      .then((res) => {
        stopWaitMsg()
        successMsg("Comment Updated")
        dispatch(deleteCommentsSuccess())
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(deleteCommentsFailure())
      })
  }
}

export function addMember(payload) {
  return (dispatch) => {
    dispatch(addMembersRequest())
    ////  
    const { projectId, employees } = payload
    waitingMsg("Adding Members to project...")
    axios
      .post("/projects/" + projectId + "/addemployee", {
        employees,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Added successfully")
        dispatch(addMembersSuccess())
      })
      .catch((err) => {
        console.log(err.message)
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(addMembersFailure())
      })
  }
}