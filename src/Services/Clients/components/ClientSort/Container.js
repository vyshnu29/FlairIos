import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Spinner from "react-native-loading-spinner-overlay"
import Presentation from "./Presentation"

function Container(props) {
  const { clients, placements_list, names } = props

  const [state, setState] = useState({
    data: [],
    status: false,
  })

  useEffect(() => {
    const statusList = ["Active", "Inactive"]
    if (isLoaded(clients) && isLoaded(placements_list)) {
      const getActiveConsultants = (clientId) => {
        const activeConsultants = placements_list
          .filter((item) => item.clientId === clientId)
          .map((item) => item.employeeID)
        return activeConsultants.map((employeeID) => names[employeeID])
      }
      let data = clients.map((client) => {
        return {
          businessDisplayName: client.businessDisplayName,
          clientId: client.clientId,
          netTerms: client.netTerms,
          jobTerminationNotice: client.jobTerminationNotice,
          status:
            getActiveConsultants(client.clientId).length === 0
              ? statusList.indexOf("Inactive")
              : statusList.indexOf("Active"),
          activeConsultants: getActiveConsultants(client.clientId).length,
        }
      })
      setState((prevState) => ({
        ...prevState,
        data,
        status: true,
      }))
    }
  }, [clients, placements_list, names])
  if (state.status) 
  return (
  <Presentation {...state} {...props} />
  )
  return (
    <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clients: state.firestore.ordered.clients_list,
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
        where: [["isExist", "==", true]],
        storeAs: "clients_list",
      },
      {
        collectionGroup: "PLACEMENTS",
        where: [["isExist", "==", true]],
        orderBy: [["id", "asc"]],
        storeAs: "placements_list",
      },
    ]
  })
)(Container)
