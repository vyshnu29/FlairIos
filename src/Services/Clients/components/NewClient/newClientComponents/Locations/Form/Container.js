import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { uploadLocationsInformation } from "../../../../../middleware"
import make_API_Call from "../../../../../../../providers/REST_API"

function Container(props) {
  const { item, index, locationsList, setLocationsInformation } = props
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
    // Object.entries(item).forEach(([key, value]) => {
    //   setState((prevState) => ({
    //     ...prevState,
    //     [key]: value,
    //   }))
    // })
    make_API_Call("get", "/loadcountries")
      .then((data) => {
        handleKeyValuePair("countries", data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [item])

  const onSubmit = (e) => {
    e.preventDefault()
    let payload = {
      ...state,
      key: 0,
      id: 0,
      isDraft: false,
    }

    let data = locationsList
    data[0] = payload

    setLocationsInformation({ locationsList: data })
  }

  const handleKeyValuePair = (key, value) => {
    const name =
      key === "state"
        ? "locationsstate_name"
        : key === "country"
        ? "locationscountry"
        : key
    setState((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  const handleChange = (name,value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
      <Presentation
        location={state}
        index={index}
        handleChange={handleChange}
        onSubmit={onSubmit}
        handleKeyValuePair={handleKeyValuePair}
      />
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLocationsInformation: (payload) => {
      dispatch(uploadLocationsInformation(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
