import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { locationActions } from "../../../../../middleware"
import stateLoader from "../../../../../../../providers/stateLoader"

function Container(props) {
  const {
    location,
    btnContent,
    locationActions,
    edit,
    clientId,
    countries,
  } = props
  const [state, setState] = useState({
    locationsline1: "",
    locationsline2: "",
    locationscountry: "",
    locationsstate_name: "",
    locationscity: "",
    locationszip: "",
    countries: [],
    states: [],
  })

  useEffect(() => {
    const tempState = {}
    Object.entries(location).forEach(([key, value]) => {
      if (state.hasOwnProperty(key)) {
        tempState[key] = value
      }
      setState((prevState) => ({
        ...prevState,
        ...tempState,
      }))
    })
    if (location.locationsstate_name && location.locationscountry) {
      loadStates(location.locationscountry)
    }
    setState((state) => ({ ...state, countries }))
  }, [location, countries])

  const loadStates = async (code) => {
    try {
      let states = await stateLoader(code)
      setState((state) => ({ ...state, states }))
    } catch (error) {
      console.error(error)
      setState((state) => ({ ...state, states: [] }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {}
    const location = {}
    Object.entries(state).forEach(([key, value]) => {
      if (key !== "countries" && key !== "states") {
        location[key] = value
      }
    })
    payload["location"] = location
    payload["locationId"] = edit ? props.location.id : null
    payload["clientId"] = clientId
    locationActions(payload)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleKeyValuePair = (key, value) => {
    const name =
      key === "state"
        ? "locationsstate_name"
        : key === "country"
        ? "locationscountry"
        : key
    if (name === "locationscountry") loadStates(value)
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
      <Presentation
        btnContent={btnContent}
        edit={edit}
        location={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleKeyValuePair={handleKeyValuePair}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    countries: state.shared.geoInfo.countries.list,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    locationActions: (payload) => {
      dispatch(locationActions(payload, ownProps.edit ? "update" : "new"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
