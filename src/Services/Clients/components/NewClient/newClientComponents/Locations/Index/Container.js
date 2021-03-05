import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { uploadLocationsInformation } from "../../../../../middleware"

function Container(props) {
  const { locationsList, setLocationsInformation } = props

  const [value, setValue] = useState(0)

  const addLocation = () => {
    let id = locationsList[locationsList.length - 1].id + 1
    let data = locationsList
    let newLocation = {
      key: id,
      id: id,
      locationsline1: "",
      locationsline2: "",
      locationscountry: "",
      locationsstate_name: "",
      locationscity: "",
      locationszip: "",
      isDraft: true,
    }
    data = [...data, newLocation]
    setLocationsInformation({ locationsList: data, status: false })
  }

  const deleteLocation = (e) => {
    e.stopPropagation()
    if (locationsList.length === 1) {
      return
    }
    let tabID = parseInt(e.target.id)
    let tabIDIndex = 0
    let tabList = locationsList.filter((value, index) => {
      if (value.id === tabID) {
        tabIDIndex = index
      }
      return value.id !== tabID
    })

    let curValue = parseInt(value)
    if (curValue === tabID) {
      if (tabIDIndex === 0) {
        curValue = locationsList[tabIDIndex + 1].id
      } else {
        curValue = locationsList[tabIDIndex - 1].id
      }
    }
    setValue(curValue)

    setLocationsInformation({ locationsList: tabList })
  }

  const handleTabChange = (_, value) => {
    setValue(value)
  }

  const state = {
    locationsList,
    value,
  }

  return (
      <Presentation
        {...state}
        handleTabChange={handleTabChange}
        addLocation={addLocation}
        deleteLocation={deleteLocation}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationsList: state.client.newClient.locations.locationsList,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLocationsInformation: (payload) => {
      dispatch(uploadLocationsInformation(payload))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
