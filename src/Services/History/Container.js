import React from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Spinner from "react-native-loading-spinner-overlay"
import Presentation from "./Presentation"

function Container(props) {
  if (isLoaded(props.history))
    return (
        <Presentation {...props} />
    )
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.firebase.auth)
  const employeeDetails = state.firebase.auth
  return {
    employee: employeeDetails,
    employeeRole: state.firebase.profile.role,
    history: state.firestore.ordered.history,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.history)
      if (props.employeeRole === "admin")
        return [
          {
            collectionGroup: "HISTORY",
            orderBy: ["createdAt", "desc"],
            limit: 15,
            storeAs: "history",
          },
        ]
      else
        return [
          {
            collection: "EMPLOYEES",
            doc: props.employee.uid,
            subcollections: [
              {
                collection: "HISTORY",
                orderBy: ["createdAt", "desc"],
                limit: 15,
                storeAs: "history",
              },
            ],
            storeAs: "history",
          },
        ]

    return []
  })
)(Container)



