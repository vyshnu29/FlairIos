import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import Spinner from "react-native-loading-spinner-overlay"
import { connect } from "react-redux"
function Container(props) {
  const { taskslist, project } = props
  if (isLoaded(taskslist, project))
    return (
      <Presentation {...props} />
    )
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    taskslist: state.firestore.ordered.taskslist,
    id: ownProps.id,
    employee: state.firebase.profile,
    project: state.firestore.ordered.project
      ? state.firestore.ordered.project[0]
      : state.firestore.ordered.projectsList.filter(
          (project) => project.id === ownProps.id
        )[0],
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    console.log(props.id)
    if (!props.taskslist)
      return [
        {
          collection: "PROJECTS",
          doc: props.id,
          subcollections: [{ collection: "TASKS", storeAs: "taskslist" }],
          storeAs: "taskslist",
        },
      ]
    return []
  })
)(Container)
