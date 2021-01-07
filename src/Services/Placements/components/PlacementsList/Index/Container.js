import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {
  Avatar,
  Title,
  ActivityIndicator
} from 'react-native-paper';
import { deletePlacement } from "../../../middleware"
import Presentation from "./Presentation"
import Spinner from "react-native-loading-spinner-overlay"

function Container(props) {
  const { placements_list, placements_documents, placements_payments } = props

  const [state, setState] = useState({
    placementsList: [],
    placementsDocuments: [],
    placementsPayments: [],
  })

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        placementsList: placements_list,
        placementsDocuments: placements_documents,
        placementsPayments: placements_payments,
      }
    })
  }, [placements_list, placements_documents, placements_payments])

  if (
    isLoaded(placements_list) &&
    isLoaded(placements_documents) &&
    isLoaded(placements_payments)
  ) {
    return (
        <Presentation
          {...props}
          placementsList={state.placementsList}
          listAll={props.listAll}
          employeeId={props.employeeId}
          clientView={props.clientView}
          clientId={props.clientId}
          placementsDocuments={state.placementsDocuments}
          placementsPayments={state.placementsPayments}
        />
    )
  }
  return (
    <>
    {
      props.listAll ? <Spinner visible={true} /> :  <ActivityIndicator />
    }
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {
    placements_list,
    placements_documents,
    placements_payments,
  } = state.firestore.ordered
  return {
    placements_list,
    placements_documents,
    placements_payments,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deletePlacement: (placementID, uid) => {
      dispatch(deletePlacement(placementID, uid))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const totalCollections = [
      {
        collectionGroup: "PLACEMENTS",
        orderBy: [["id", "asc"]],
        where: [["isExist", "==", true]],
        storeAs: "placements_list",
      },
      {
        collectionGroup: "SETTINGS",
        where: [["id", "==", "documents"]],
        storeAs: "placements_documents",
      },
      {
        collectionGroup: "SETTINGS",
        where: [["id", "==", "payments"]],
        storeAs: "placements_payments",
      },
    ]

    return totalCollections
  })
)(Container)
