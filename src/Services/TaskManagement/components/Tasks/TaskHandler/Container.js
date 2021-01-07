
import Spinner from 'react-native-loading-spinner-overlay'
import React, { useEffect } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
function Container(props) {
  const { comments } = props
  const [state, setState] = React.useState({
    comments: [],
  })
  useEffect(() => {
    isLoaded(comments)
  }, [comments])
  if (isLoaded(props.project, props.tasktimeline))
    return (
        <Presentation {...props}  />
    )
  return (<Spinner visible={true} />)
}

const mapStateToProps = (state, ownProps) => {
  return {
    // taskslist: state.firestore.ordered.taskslist,
    projectId: ownProps.route.params.projectId,
    taskId: ownProps.route.params.taskId,
    project: state.firestore.ordered.project,
    tasktimeline: state.firestore.ordered.tasktimeline,
    names: state.firestore.ordered.names,
    employee: state.firebase.profile,
    modules: state.employee.employeeModules.accessModules,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.project || !props.tasktimeline)
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
              subcollections: [
                {
                  collection: "TASK_TIMELINE",
                  storeAs: "tasktimeline",
                },
              ],
              storeAs: "tasktimeline",
            },
          ],
          storeAs: "tasktimeline",
        },
      ]
    return []
  })
)(Container)
