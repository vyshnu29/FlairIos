import { combineReducers } from "redux"
import { newProjectReducer } from "./newProjectReducer"
import { removeMemberReducer } from "./removeMemberReducer"
import { updateProjectReducer } from "./updateProjectReducer"
import { deleteLabelsReducer } from "./deleteLabelsReducer"
import { updateLabelsReducer } from "./updateLabelsReducer"
import { createLabelsReducer } from "./createLabelsReducer"
import { updatePermissionReducer } from "./updatePermissionsReducer"
import { addCommentReducer } from "./addCommentReducer"
import { addMemberReducer } from "./addMembersReducer"
import { createSubTasksReducer } from "./createSubTasksReducer"
import { createTasksReducer } from "./createTasksReducer"
import { deleteCommentsReducer } from "./deleteCommentsReducer"
import { editTasksReducer } from "./editTasksReducer"
import { updateCommentsReducer } from "./UpdateCommentReducer"
import projectsListReducer from "./projectsListReducer"
import projectReducer from "./ProjectReducer"
import tasksListReducer from "./taskListReducer"
import taskReducer from "./loadTaskReducer"
import taskListReducer from "./TasksListReducer"

const rootReducer = combineReducers({
  removeMember: removeMemberReducer,
  updateProject: updateProjectReducer,
  newProject: newProjectReducer,
  updateLabels: updateLabelsReducer,
  updatePermission: updatePermissionReducer,
  deleteLabels: deleteLabelsReducer,
  createLabels: createLabelsReducer,
  addComment: addCommentReducer,
  addMember: addMemberReducer,
  createSubTasks: createSubTasksReducer,
  createTasks: createTasksReducer,
  deleteComments: deleteCommentsReducer,
  editTasks: editTasksReducer,
  updateComments: updateCommentsReducer,
  projectsList: projectsListReducer,
  project: projectReducer,
  task: taskReducer,
  tasksList: tasksListReducer,
  LoadedTasksList: taskListReducer,
})

export default rootReducer
