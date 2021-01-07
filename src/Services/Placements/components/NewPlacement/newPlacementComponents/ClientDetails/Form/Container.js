import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import {
  addSectionToPlacement,
  getLocations,
  updatePlacement,
} from "../../../../../middleware"

function Container(props) {
  const {
    item,
    clients,
    clients_list,
    tabList,
    index,
    addSectionToPlacement,
    updatePlacement,
    fillableSections,
    uid,
    id,
    clients_locations_state,
    getclientLocations,
  } = props

  const [reqClient, setReqClient] = useState({})

  useEffect(() => {
    if (item.clientId) {
      setReqClient(clients[item.clientId])
      getLocations(item.clientId)
    }
  }, [item, reqClient, clients])

  const getLocations = (value) => {
    getclientLocations(value)
  }

  const callback = () => {}

  const handleChange = (event) => {
    const { name, value } = event.target
    let data = tabList
    data[index] = {
      ...data[index],
      [name]: value,
    }

    props.handleChange(data)
  }

  const handleCheck = (event) => {
    const { name, checked } = event.target
    let data = tabList
    data[index] = {
      ...data[index],
      [name]: checked,
    }

    props.handleChange(data)
  }

  const onChange = (key, value) => {
    let data = tabList
    data[index] = {
      ...data[index],
      [key]: value,
    }

    props.handleChange(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const client = {}
    Object.entries(item).forEach(([key, value]) => {
      if (key !== "id" && key !== "key" && key !== "selectAddressList" && key !== "isDraft") {
        client[key] = value
      }
    })
    if (fillableSections.includes("client_details")) {
      addSectionToPlacement(
        { clients: { [client.clientId]: { ...client } } },
        "client_details",
        uid,
        id,
        callback
      )
    } else {
      console.log("update")
      updatePlacement({ client }, "client_details", uid, id, callback)
    }
  }

  return (
    <Presentation
      handleChange={handleChange}
      handleCheck={handleCheck}
      reqClient={reqClient}
      clients_list={clients_list}
      item={item}
      onChange={onChange}
      handleSubmit={handleSubmit}
      clients_locations_state={clients_locations_state}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { placement } = state.firestore.ordered
  return {
    placement,
    clients: state.firestore.data.clients_list,
    clients_list: state.firestore.ordered.clients_list,
    clients_locations_state: state.placement.clientlocations,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSectionToPlacement: (payload, sectionName, uid, placementID, callback) => {
      dispatch(addSectionToPlacement(payload, sectionName, uid, placementID, callback))
    },
    updatePlacement: (payload, sectionName, uid, placementID, callback) => {
      dispatch(updatePlacement(payload, sectionName, uid, placementID, callback))
    },
    getclientLocations: (clientId) => {
      dispatch(getLocations(clientId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
