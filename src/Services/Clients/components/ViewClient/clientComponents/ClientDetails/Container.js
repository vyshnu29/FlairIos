import React from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {ActivityIndicator} from 'react-native-paper'
import Presentation from "./Presentation"

function Container(props) {
  const { accounts } = props

  if (isLoaded(accounts))
    return (
     
         <Presentation {...props}  client={props.client}/>
    )

  return (
    <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.firestore.ordered.accounts,
    placements_list: state.firestore.ordered.placements_list,
    names: state.firestore.data.names,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "CLIENTS",
        doc: props.client.id,
        subcollections: [
          {
            collection: "CLIENTS_ACCOUNTS",
            where: [["isExist", "==", true]],
          },
        ],
        storeAs: "accounts",
      },
    ]
  })
)(Container)
