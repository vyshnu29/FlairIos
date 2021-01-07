import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from "react-redux"
import { compose } from "redux"

function Container(props) {
	if (isLoaded(props.task, props.project))
    return (
        <Presentation {...props} />
    )
	return (
  <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const taskId = ownProps.route.params.taskId
  const projectId = ownProps.route.params.projectId
  const task = state.firestore.ordered.task
    ? state.firestore.ordered.task.filter((e) => e.id === taskId).length
      ? state.firestore.ordered.task.filter((e) => e.id === taskId)[0]
      : undefined
    : state.firestore.ordered.task
  const project = state.firestore.ordered.project
    ? state.firestore.ordered.project[0]
    : state.firestore.ordered.project

  return {
    task: task,
    project: project,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.task)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          storeAs: "project",
        },
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          subcollections: [
            {
              collection: "TASKS",
              doc: props.route.params.taskId,
              storeAs: "task",
            },
          ],
          storeAs: "task",
        },
      ]
    return []
  })
)(Container)
