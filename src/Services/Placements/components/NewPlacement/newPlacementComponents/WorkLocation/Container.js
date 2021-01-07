import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {View,Text} from "react-native"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"
//import { getStates } from "../../../../../../shared/middleware"
import stateLoader from "../../../../../../providers/stateLoader"

function Container(props) {
  const {
    worklocation_data,
    placement,
    profile,
    addSectionToPlacement,
    updatePlacement,
  } = props

  const initState = {
    type: "",
    email: "",
    phonenumber: "",
    phoneExtension: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    amendmentRequired: false,
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
    states: [],
  }

  const [state, setState] = useState(initState)

  const callback = () => {}

  useEffect(() => {
    if (isLoaded(worklocation_data) && !isEmpty(worklocation_data)) {
      console.log("entered")
      setState((prevState) => ({
        ...prevState,
        type: worklocation_data.type,
        email: worklocation_data.email,
        phonenumber: worklocation_data.phonenumber,
        phoneExtension: worklocation_data.phoneExtension,
        line1: worklocation_data.line1,
        line2: worklocation_data.line2,
        city: worklocation_data.city,
        state: worklocation_data.state,
        country: worklocation_data.country,
        zip: worklocation_data.zip,
        amendmentRequired: worklocation_data.amendmentRequired,
      }))
      if (worklocation_data.state && worklocation_data.country) {
        loadStates(worklocation_data.country)
      }
    } else setState(() => ({ ...initState }))
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
    }))
    //  return () => setState(() => ({ ...initState }))
  }, [worklocation_data, placement])

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChecked = (event) => {
    const { name, checked } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleKeyValuePair = (key, value) => {
    console.log(key, value)
    if (key === "country") {
      if (value) loadStates(value)
    }
    setState((state) => ({ ...state, [key]: value }))
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {}
    Object.entries(state).forEach(([key, value]) => {
      if (
        key !== "fillableSections" &&
        key !== "id" &&
        key !== "employeeID" &&
        key !== "states"
      ) {
        payload[key] = value
      }
    })
    if (state.fillableSections.includes("worklocation")) {
      addSectionToPlacement(payload, "worklocation", state.employeeID, state.id, callback)
    } else {
      updatePlacement(payload, "worklocation", state.employeeID, state.id, callback)
    }
  }
console.log('lo',placement[0])

  if (isLoaded(worklocation_data)) {
    return (
      <Presentation
        {...state}
        handleChange={handleChange}
        handleChecked={handleChecked}
        handleSubmit={handleSubmit}
        handleKeyValuePair={handleKeyValuePair}
      />
    )
  }
  return (
    <View>
      <Text>No data</Text>
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    worklocation_data: state.firestore.data.worklocation_data,
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
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { placement } = props
    if (!placement.id) return []
    return [
      {
        collection: "EMPLOYEES",
        doc: placement.employeeID,
        subcollections: [
          {
            collection: "PLACEMENTS",
            doc: placement.id,
            subcollections: [
              {
                collection: "SETTINGS",
                doc: "worklocation",
                storeAs: "worklocation",
              },
            ],
            storeAs: "placement_worklocation",
          },
        ],
        storeAs: "worklocation_data",
      },
    ]
  })
)(Container)
