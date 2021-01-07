import React, { useEffect } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import {ActivityIndicator} from 'react-native'
import { compose } from "redux"
import { connect } from "react-redux"
import { loadTask,setState } from "../../../../middleware/tasks"
function Container(props) {
  const {  project, _load_task ,isLoadingTask,taskData} = props
  let payload = {
    taskID: props.taskId,
    projectID: props.projectId,
  }
  let task = []
  useEffect(() => {
    _load_task(payload)
  }, [])
  if (isLoaded(project)) {
    if(!isLoadingTask){
      task = Object.values(taskData["taskData"])
    
      return (
          <Presentation
            {...props}
          task={task}
          />
      )
    }
    else {
      return <ActivityIndicator/>
    }
  }
  return <ActivityIndicator/>
}

const mapStateToProps = (state, ownProps) => {
  const taskId = ownProps.taskId
  const projectId = ownProps.projectId
  const tasksList = state.firestore.ordered.taskslist
  const project = state.firestore.ordered.project

  return {
    taskData: state.projects.task,
    taskId: taskId,
    projectId: projectId,
    project: project,
    isLoadingTask: state.projects.task.taskData.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    _load_task: (payload) => {
      dispatch(loadTask(payload))
    },
    // _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.tasksList || !props.project)
      return [
        {
          collection: "PROJECTS",
          doc: props.projectId,
          storeAs: "project",
        },
        {
          collection: "PROJECTS",
          doc: props.projectId,
          subcollections: [
            {
              collection: "TASKS",
              storeAs: "taskslist",
            },
          ],
          storeAs: "taskslist",
        },
      ]
    return []
  })
)(Container)