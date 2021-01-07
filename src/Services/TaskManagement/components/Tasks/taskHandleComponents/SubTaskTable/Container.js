import {ActivityIndicator} from 'react-native-paper'
import React, { useEffect } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import { loadTasksList,setState } from "../../../../middleware/tasks"
function Container(props) {

  const {
    task,
    project,
    _load_taskslist,
    isLoadingTaskList,
    tasksListData,
  } = props
  let tasksListPayload = {
    projectID:props.projectId
  }
let tasksList = []
   useEffect(() => {
     _load_taskslist(tasksListPayload)
   }, [])
  if (isLoaded(task && project)) {
    if (!isLoadingTaskList) {
      tasksList = Object.values(tasksListData["tasksListData"].data)
      return (
          <Presentation
            {...props}
          tasksList={tasksList}
          />
      )
    }
    else
      return <ActivityIndicator/>
  }
  return <ActivityIndicator/>
}

const mapStateToProps = (state, ownProps) => {
  const taskId = ownProps.taskId
  // const projectId = ownProps.projectId
  const tasksList = state.firestore.ordered.taskslist
  const task = tasksList && tasksList.filter((item) => item.id === taskId)
  const project = state.firestore.ordered.project
  // ? state.firestore.ordered.project
  // : state.firestore.ordered.projectsList.filter(
  //     (item) => item.id === projectId
  //   )[0]

  return {
    task: task,
    project: project,
    tasksListData: state.projects.tasksList,
    isLoadingTaskList: state.projects.tasksList.tasksListData.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_taskslist: (payload) => {
      dispatch(loadTasksList(payload))
    },
    // _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.task || !props.project)
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
              storeAs: "tasks",
            },
          ],
          storeAs: "taskslist",
        },
      ]
    return []
  })
)(Container)

// export default Container
