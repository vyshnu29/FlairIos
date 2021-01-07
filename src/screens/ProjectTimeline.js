import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import ProjectTimeline from "../Services/TaskManagement/components/ProjectHandleComponents/Timeline/index"
import { compose } from "redux"
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from "react-redux"


function Container(props) {

  if (isLoaded(props.timelines))
    return (
        <ProjectTimeline {...props} />
    )
	return <Spinner visible={true} />
}
const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.route.params.projectId,
    timelines: state.firestore.ordered.timelines,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.timelines)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          subcollections: [
            {
              collection: "PROJECT_TIMELINE",
              orderBy: ["createdAt", "desc"],
              storeAs: "timelines",
            },
          ],
          storeAs: "timelines",
        },
      ]
    return []
  })
)(Container)