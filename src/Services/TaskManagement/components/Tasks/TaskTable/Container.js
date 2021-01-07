import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from "react-redux"

function Container(props) {
  
  if (isLoaded(props.project))
    return (
        <Presentation  {...props} />
    )
  return (
   <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
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
   firestoreConnect((props) => {
    if (!props.project)
      return [
        {
          collection: "PROJECTS",
          doc: props.id,
          storeAs: "project",
        },
      ]
    return []
  }),
  connect(mapStateToProps)
 
)(Container)
