import React from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import { locationActions } from "../../../../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  return (
      <Presentation {...props} client={props.client}/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.firestore.ordered.locations,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteLocation: (payload) => {
      dispatch(locationActions(payload, "delete"))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "CLIENTS",
        doc: props.client.id,
        subcollections: [
          {
            collection: "CLIENTS_LOCATIONS",
            where: [["isExist", "==", true]],
          },
        ],
        storeAs: "locations",
      },
    ]
  })
)(Container)
