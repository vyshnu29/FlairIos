import React from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import { contactActions } from "../../../../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  return (
      <Presentation {...props} client={props.client} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.firestore.ordered.contacts,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteContact: (payload) => {
      dispatch(contactActions(payload, "delete"))
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
            collection: "CLIENTS_CONTACTS",
            where: [["isExist", "==", true]],
          },
        ],
        storeAs: "contacts",
      },
    ]
  })
)(Container)
