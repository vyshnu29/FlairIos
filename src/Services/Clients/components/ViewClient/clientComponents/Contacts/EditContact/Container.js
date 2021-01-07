import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { contactActions } from "../../../../../middleware"
import stateLoader from "../../../../../../../providers/stateLoader"

function Container(props) {
  const {
    contact,
    btnContent,
    edit,
    clientId,
    countries,
    contactActions,
  } = props
  const [state, setState] = useState({
    representativeName: "",
    jobTitle: "",
    contactType: "",
    gender: "",
    email: "",
    mobile: "",
    workPhone: "",
    homePhone: "",
    line1: "",
    line2: "",
    country: "",
    state_name: "",
    city: "",
    zip: "",
    workPhoneExtension: "",
    countries: [],
    states: [],
  })

  useEffect(() => {
    const tempState = {}
    Object.entries(contact).forEach(([key, value]) => {
      if (state.hasOwnProperty(key)) {
        tempState[key] = value
      }
      setState((prevState) => ({
        ...prevState,
        ...tempState,
      }))
    })
    if (contact.state_name && contact.country) {
      loadStates(contact.country)
    }
    setState((state) => ({ ...state, countries }))
  }, [contact, countries])


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
    const contact = {}
    Object.entries(state).forEach(([key, value]) => {
      if (key !== "countries" && key !== "states") {
        contact[key] = value
      }
    })
    payload["contact"] = contact
    payload["contactId"] = edit ? props.contact.id : null
    payload["clientId"] = clientId
    contactActions(payload)
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
    const name = key === "state" ? "state_name" : key
    if (key === "country") {
      loadStates(value)
    }
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
        contact={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleKeyValuePair={handleKeyValuePair}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const shared = state.shared.geoInfo
  return {
    countries: shared.countries.list,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    contactActions: (payload) => {
      dispatch(contactActions(payload, ownProps.edit ? "update" : "new"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
