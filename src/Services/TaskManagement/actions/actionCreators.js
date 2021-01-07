import ACTION from "./actionTypes"

export const setStateAction = (payload) => ({
  type: ACTION.SET_STATE,
  payload,
})

export const setListener = (listener, type) => ({
  type: ACTION.SET_LISTENER,
  payload: {
    listener,
    type,
  },
})
export const unSubscribeListenerAction = (payload) => ({
  type: ACTION.UNSUBSCRIBE_LISTENER,
  payload,
})

export function newProjectRequest() {
  return {
    type: ACTION.NEW_PROJECT_REQUEST,
  }
}

export function newProjectSuccess() {
  return {
    type: ACTION.NEW_PROJECT_SUCCESS,
  }
}

export function newProjectFailure(error) {
  return {
    type: ACTION.NEW_PROJECT_FAILURE,
    error,
  }
}
export function projectUpdationRequest() {
  return {
    type: ACTION.UPDATE_PROJECT_REQUEST,
  }
}

export function projectUpdationSuccess() {
  return {
    type: ACTION.UPDATE_PROJECT_SUCCESS,
  }
}

export function projectUpdationFailure(error) {
  return {
    type: ACTION.UPDATE_PROJECT_FAILURE,
    error,
  }
}
export function removeMemberRequest() {
  return {
    type: ACTION.REMOVE_MEMBER_REQUEST,
  }
}

export function removeMemberSuccess() {
  return {
    type: ACTION.REMOVE_MEMBER_SUCCESS,
  }
}

export function removeMemberFailure(error) {
  return {
    type: ACTION.REMOVE_MEMBER_FAILURE,
    error,
  }
}
export function createLabelsRequest() {
  return {
    type: ACTION.CREATE_LABELS_REQUEST,
  }
}

export function createLabelsSuccess() {
  return {
    type: ACTION.CREATE_LABELS_SUCCESS,
  }
}

export function createLabelsFailure(error) {
  return {
    type: ACTION.CREATE_LABELS_FAILURE,
    error,
  }
}
export function updateLabelsRequest() {
  return {
    type: ACTION.UPDATE_LABELS_REQUEST,
  }
}

export function updateLabelsSuccess() {
  return {
    type: ACTION.UPDATE_LABELS_SUCCESS,
  }
}

export function updateLabelsFailure(error) {
  return {
    type: ACTION.UPDATE_LABELS_FAILURE,
    error,
  }
}
export function deleteLabelsRequest() {
  return {
    type: ACTION.DELETE_LABELS_REQUEST,
  }
}

export function deleteLabelsSuccess() {
  return {
    type: ACTION.DELETE_LABELS_SUCCESS,
  }
}

export function deleteLabelsFailure(error) {
  return {
    type: ACTION.DELETE_LABELS_FAILURE,
    error,
  }
}
export function updatePermissionsRequest() {
  return {
    type: ACTION.UPDATE_PERMISSIONS_REQUEST,
  }
}

export function updatePermissionsSuccess() {
  return {
    type: ACTION.UPDATE_PERMISSIONS_SUCCESS,
  }
}

export function updatePermissionsFailure(error) {
  return {
    type: ACTION.UPDATE_PERMISSIONS_FAILURE,
    error,
  }
}

export function createTasksRequest() {
  return {
    type: ACTION.NEW_TASKS_REQUEST,
  }
}

export function createTasksSuccess() {
  return {
    type: ACTION.NEW_TASKS_SUCCESS,
  }
}

export function createTasksFailure(error) {
  return {
    type: ACTION.NEW_TASKS_FAILURE,
    error,
  }
}

export function editTasksRequest() {
  return {
    type: ACTION.EDIT_TASKS_REQUEST,
  }
}

export function editTasksSuccess() {
  return {
    type: ACTION.EDIT_TASKS_SUCCESS,
  }
}

export function editTasksFailure(error) {
  return {
    type: ACTION.EDIT_TASKS_FAILURE,
    error,
  }
}

export function linkTasksRequest() {
  return {
    type: ACTION.LINK_TASKS_REQUEST,
  }
}

export function linkTasksSuccess() {
  return {
    type: ACTION.LINK_TASKS_SUCCESS,
  }
}

export function linkTasksFailure(error) {
  return {
    type: ACTION.LINK_TASKS_FAILURE,
    error,
  }
}

export function unLinkTasksRequest() {
  return {
    type: ACTION.UNLINK_TASKS_REQUEST,
  }
}

export function unLinkTasksSuccess() {
  return {
    type: ACTION.UNLINK_TASKS_SUCCESS,
  }
}

export function unLinkTasksFailure(error) {
  return {
    type: ACTION.UNLINK_TASKS_FAILURE,
    error,
  }
}

export function createSubTasksRequest() {
  return {
    type: ACTION.NEW_SUBTASKS_REQUEST,
  }
}

export function createSubTasksSuccess() {
  return {
    type: ACTION.NEW_SUBTASKS_SUCCESS,
  }
}

export function createSubTasksFailure(error) {
  return {
    type: ACTION.NEW_SUBTASKS_FAILURE,
    error,
  }
}

export function addCommentsRequest() {
  return {
    type: ACTION.NEW_COMMENTS_REQUEST,
  }
}

export function addCommentsSuccess() {
  return {
    type: ACTION.NEW_COMMENTS_SUCCESS,
  }
}

export function addCommentsFailure(error) {
  return {
    type: ACTION.NEW_COMMENTS_FAILURE,
    error,
  }
}

export function updateCommentsRequest() {
  return {
    type: ACTION.UPDATE_COMMENTS_REQUEST,
  }
}

export function updateCommentsSuccess() {
  return {
    type: ACTION.UPDATE_COMMENTS_SUCCESS,
  }
}

export function updateCommentsFailure(error) {
  return {
    type: ACTION.UPDATE_COMMENTS_FAILURE,
    error,
  }
}

export function deleteCommentsRequest() {
  return {
    type: ACTION.DELETE_COMMENTS_REQUEST,
  }
}

export function deleteCommentsSuccess() {
  return {
    type: ACTION.DELETE_COMMENTS_SUCCESS,
  }
}

export function deleteCommentsFailure(error) {
  return {
    type: ACTION.DELETE_COMMENTS_FAILURE,
    error,
  }
}

export function addMembersRequest() {
  return {
    type: ACTION.ADD_MEMBERS_REQUEST,
  }
}

export function addMembersSuccess() {
  return {
    type: ACTION.ADD_MEMBERS_SUCCESS,
  }
}

export function addMembersFailure(error) {
  return {
    type: ACTION.ADD_MEMBERS_FAILURE,
    error,
  }
}


export function loadAllProjectsRequest() {
  return {
    type: ACTION.LOAD_ALL_PROJECTS_REQUEST,
  }
}

export function loadAllProjectsSuccess(payload) {
  return {
    type: ACTION.LOAD_ALL_PROJECTS_SUCCESS,
    payload,
  }
}

export function loadAllProjectsFailure(payload) {
  return {
    type: ACTION.LOAD_ALL_PROJECTS_FAILURE,
    payload,
  }
}

export function loadInProgressProjectsRequest() {
  return {
    type: ACTION.LOAD_INPROGRESS_PROJECTS_REQUEST,
  }
}

export function loadInProgressProjectsSuccess(payload) {
  return {
    type: ACTION.LOAD_INPROGRESS_PROJECTS_SUCCESS,
    payload,
  }
}

export function loadInProgressProjectsFailure(payload) {
  return {
    type: ACTION.LOAD_INPROGRESS_PROJECTS_FAILURE,
    payload,
  }
}

export function loadOverDueProjectsRequest() {
  return {
    type: ACTION.LOAD_OVERDUE_PROJECTS_REQUEST,
  }
}

export function loadOverDueProjectsSuccess(payload) {
  return {
    type: ACTION.LOAD_OVERDUE_PROJECTS_SUCCESS,
    payload,
  }
}

export function loadOverDueProjectsFailure(payload) {
  return {
    type: ACTION.LOAD_OVERDUE_PROJECTS_FAILURE,
    payload,
  }
}

export function loadClosedProjectsRequest() {
  return {
    type: ACTION.LOAD_CLOSED_PROJECTS_REQUEST,
  }
}

export function loadClosedProjectsSuccess(payload) {
  return {
    type: ACTION.LOAD_CLOSED_PROJECTS_SUCCESS,
    payload,
  }
}

export function loadClosedProjectsFailure(payload) {
  return {
    type: ACTION.LOAD_CLOSED_PROJECTS_FAILURE,
    payload,
  }
}

export function loadProjectRequest() {
  return {
    type: ACTION.LOAD_PROJECT_REQUEST,
  }
}

export function loadProjectSuccess(payload) {
  return {
    type: ACTION.LOAD_PROJECT_SUCCESS,
    payload,
  }
}

export function loadProjectFailure(payload) {
  return {
    type: ACTION.LOAD_PROJECT_FAILURE,
    payload,
  }
}

export function loadTaskRequest() {
  return {
    type: ACTION.LOAD_TASK_REQUEST,
  }
}

export function loadTaskSuccess(payload) {
  return {
    type: ACTION.LOAD_TASK_SUCCESS,
    payload,
  }
}

export function loadTaskFailure(payload) {
  return {
    type: ACTION.LOAD_TASK_FAILURE,
    payload,
  }
}

export function loadTasksListRequest() {
  return {
    type: ACTION.LOAD_TASKSLIST_REQUEST,
  }
}

export function loadTasksListSuccess(payload) {
  return {
    type: ACTION.LOAD_TASKSLIST_SUCCESS,
    payload,
  }
}

export function loadTasksListFailure(payload) {
  return {
    type: ACTION.LOAD_TASKSLIST_FAILURE,
    payload,
  }
}

export function loadTaskCommentsRequest() {
  return {
    type: ACTION.LOAD_TASK_COMMENTS_REQUEST,
  }
}

export function loadTaskCommentsSuccess(payload) {
  return {
    type: ACTION.LOAD_TASK_COMMENTS_SUCCESS,
    payload,
  }
}

export function loadTaskCommentsFailure(payload) {
  return {
    type: ACTION.LOAD_TASK_COMMENTS_FAILURE,
    payload,
  }
}


export function loadClosedTasksRequest() {
  return {
    type: ACTION.LOAD_CLOSED_TASKS_REQUEST,
  }
}

export function loadClosedTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_CLOSED_TASKS_SUCCESS,
    payload,
  }
}

export function loadClosedTasksFailure(payload) {
  return {
    type: ACTION.LOAD_CLOSED_TASKS_FAILURE,
    payload,
  }
}

export function loadAllTasksRequest() {
  return {
    type: ACTION.LOAD_ALL_TASKS_REQUEST,
  }
}

export function loadAllTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_ALL_TASKS_SUCCESS,
    payload,
  }
}

export function loadAllTasksFailure(payload) {
  return {
    type: ACTION.LOAD_ALL_TASKS_FAILURE,
    payload,
  }
}

export function loadOpenTasksRequest() {
  return {
    type: ACTION.LOAD_OPEN_TASKS_REQUEST,
  }
}

export function loadOpenTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_OPEN_TASKS_SUCCESS,
    payload,
  }
}

export function loadOpenTasksFailure(payload) {
  return {
    type: ACTION.LOAD_OPEN_TASKS_FAILURE,
    payload,
  }
}

export function loadReviewTasksRequest() {
  return {
    type: ACTION.LOAD_REVIEW_TASKS_REQUEST,
  }
}

export function loadReviewTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_REVIEW_TASKS_SUCCESS,
    payload,
  }
}

export function loadReviewTasksFailure(payload) {
  return {
    type: ACTION.LOAD_REVIEW_TASKS_FAILURE,
    payload,
  }
}

export function loadInProgressTasksRequest() {
  return {
    type: ACTION.LOAD_INPROGRESS_TASKS_REQUEST,
  }
}

export function loadInProgressTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_INPROGRESS_TASKS_SUCCESS,
    payload,
  }
}

export function loadInProgressTasksFailure(payload) {
  return {
    type: ACTION.LOAD_INPROGRESS_TASKS_FAILURE,
    payload,
  }
}

export function loadOverDueTasksRequest() {
  return {
    type: ACTION.LOAD_OVERDUE_TASKS_REQUEST,
  }
}

export function loadOverDueTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_OVERDUE_TASKS_SUCCESS,
    payload,
  }
}

export function loadOverDueTasksFailure(payload) {
  return {
    type: ACTION.LOAD_OVERDUE_TASKS_FAILURE,
    payload,
  }
}

export function loadSubTasksRequest() {
  return {
    type: ACTION.LOAD_SUB_TASKS_REQUEST,
  }
}

export function loadSubTasksSuccess(payload) {
  return {
    type: ACTION.LOAD_SUB_TASKS_SUCCESS,
    payload,
  }
}

export function loadSubTasksFailure(payload) {
  return {
    type: ACTION.LOAD_SUB_TASKS_FAILURE,
    payload,
  }
}