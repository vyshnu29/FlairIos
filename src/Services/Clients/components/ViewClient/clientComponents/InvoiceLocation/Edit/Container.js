import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import stateLoader from "../../../../../../../providers/stateLoader"
import { editClientDetails } from "../../../../../middleware"

function Container(props) {
  const { invoiceLocation, countries, editClientDetails } = props
  const [state, setState] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    states: [],
    countries: [],
  })

  useEffect(() => {
    const tempState = {}
    Object.entries(invoiceLocation).forEach(([key, value]) => {
      if (state.hasOwnProperty(key)) {
        tempState[key] = value
      }
    })
    if (invoiceLocation.state && invoiceLocation.country) {
      loadStates(invoiceLocation.country)
    }
    setState((state) => ({
      ...state,
      ...tempState,
      countries,
    }))
  }, [invoiceLocation, countries])

  const handleSubmit = (e) => {
    e.preventDefault()
    const invoiceLocation = {}
    Object.entries(state).forEach(([key, value]) => {
      if (key !== "states" && key !== "countries") {
        invoiceLocation[key] = value
      }
    })
    editClientDetails({ invoiceLocation })
  }

  const loadStates = async (code) => {
    try {
      let states = await stateLoader(code)
      setState((state) => ({ ...state, states }))
    } catch (error) {
      console.error(error)
      setState((state) => ({ ...state, states: [] }))
    }
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

  const handleKeyValuePair = (name, value) => {
    if (name === "country") loadStates(value)
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
      <Presentation
        state={state}
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
    editClientDetails: (payload) => {
      dispatch(editClientDetails(payload, ownProps.id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)