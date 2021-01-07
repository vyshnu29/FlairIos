import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import validate from "../../../../../../shared/validation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"
import {View,Text,ActivityIndicator} from "react-native"


function Container(props) {
  const {
    invoices_data,
    placement,
    profile,
    addSectionToPlacement,
    updatePlacement,
    timesheets_data,
  } = props

  const initState = {
    frequency: "",
    OT: true,
    POnumber: false,
    pointOfContactMailId: "",
    attachFlairExpense: false,
    attachFlairTimesheets: false,
    bcc: [],
    billingAddress: "",
    calculationType: "",
    cc: [],
    frequencyStartDate: "",
    pointOfContactName: "",
    pointOfContactPhoneNo: "",
    to: [],
    value: 0,
    index: "",
    helperText: {
      to: "",
      cc: "",
      bcc: "",
    },
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
  }

  const [state, setState] = useState(initState)

  useEffect(() => {
    if (isLoaded(invoices_data) && !isEmpty(invoices_data)) {
      setState((prevState) => ({
        ...prevState,
        frequency: (invoices_data.frequency - 1).toString(),
        OT: invoices_data.OT,
        POnumber: invoices_data.POnumber,
        pointOfContactMailId: invoices_data.pointOfContactMailId,
        attachFlairExpense: invoices_data.attachFlairExpense,
        attachFlairTimesheets: invoices_data.attachFlairTimesheets,
        bcc: invoices_data.bcc,
        billingAddress: invoices_data.billingAddress,
        calculationType: invoices_data.calculationType,
        cc: invoices_data.cc,
        frequencyStartDate: invoices_data.frequencyStartDate,
        pointOfContactName: invoices_data.pointOfContactName,
        pointOfContactPhoneNo: invoices_data.pointOfContactPhoneNo,
        to: invoices_data.to,
      }))
    } else {
      setState(() => ({
        ...initState,
        frequencyStartDate: placement.startDate,
      }))
    }
    if (isLoaded(timesheets_data) && !isEmpty(timesheets_data)) {
      setState((state) => ({
        ...state,
        index: timesheets_data.cycle[timesheets_data.cycle.length - 1].range,
      }))
    }
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
    }))
    //return () => setState(() => ({ ...initState }))
  }, [invoices_data, placement])

  const handleTab = (e, v) => {
    setState({ ...state, value: v })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {}
    Object.entries(state).forEach(([key, value]) => {
      if (
        key !== "fillableSections" &&
        key !== "id" &&
        key !== "employeeID" &&
        key !== "helperText" &&
        key !== "index" &&
        key !== "value"
      ) {
        if (key === "frequency") {
          payload[key] = parseInt(value) + 1
        } else {
          payload[key] = value
        }
      }
    })
    if (state.fillableSections.includes("invoices")) {
      addSectionToPlacement(payload, "invoices", state.employeeID, state.id, callback)
    } else {
      updatePlacement(payload, "invoices", state.employeeID, state.id, callback)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleAdd = (name, chip) => {
    let data = state[name]
    if (validate.checkEmail(chip)) {
      data = [...data, chip]
      setState({
        ...state,
        helperText: {
          to: "",
          cc: "",
          bcc: "",
        },
      })
    } else {
      setState((prevState) => ({
        ...prevState,
        helperText: {
          ...prevState.helperText,
          [name]: "Enter valid email",
        },
      }))
    }
    setState({ ...state, [name]: data })
    console.log("add", data)
  }

  const handleDelete = (name, index) => {
    let data = state[name].filter((_, i) => i !== index)
    setState({ ...state, [name]: data })
    console.log("delete", data)
  }

  const handleCheck = (event) => {
    const { name, checked } = event.target
    setState({
      ...state,
      [name]: checked,
    })
  }

  const callback = () => {}

  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value))) {
      const date = new Date(value)
      date.setHours(0, 0, 0, 0)
      setState({
        ...state,
        [key]: date.toISOString(),
      })
    }
  }

  //if (isEmpty(timesheets_data)) return <View><Text>Fill the timesheet details</Text></View>

  if (isLoaded(invoices_data)) {
    return (
      <Presentation
        {...state}
        handleChange={handleChange}
        handleCheck={handleCheck}
        handleDateChange={handleDateChange}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleTab={handleTab}
        handleSubmit={handleSubmit}
      />
    )
  }

  return (
  <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    invoices_data: state.firestore.data.invoices_data,
    timesheets_data: state.firestore.data.timesheets_data,
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
                doc: "invoices",
                storeAs: "invoices",
              },
            ],
            storeAs: "placement_invoices",
          },
        ],
        storeAs: "invoices_data",
      },
    ]
  })
)(Container)
