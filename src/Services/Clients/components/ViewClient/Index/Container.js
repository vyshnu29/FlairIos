import React, { useEffect } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import Spinner from "react-native-loading-spinner-overlay"
import { getCountries } from "../../../../../shared/middleware"

function Container(props) {
  const { client, placements_list, isLoad_Countries, setCountries } = props

  useEffect(() => {
    setCountries()
  }, [])

  if (isLoaded(client) && isLoaded(placements_list) && isLoad_Countries) {
    return (
        <Presentation client={client} {...props}/>
    )
  }

  return (
    <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    client: state.firestore.data.client,
    placements_list: state.firestore.ordered.placements_list,
    isLoad_Countries: state.shared.geoInfo.countries.isLoaded,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCountries: () => {
      dispatch(getCountries())
    },
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "CLIENTS",
        doc: props.route.params.clientId,
        storeAs: "client",
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
