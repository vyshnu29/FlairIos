import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"
import { ActivityIndicator } from "react-native"

function Container(props) {
  const {
    timesheets_data,
    approvals,
    placement,
    profile,
    addSectionToPlacement,
    projectsList,
    updatePlacement,
  } = props
  const initState = {
    timesheetCycle: "",
    startDay: "",
    approvalBy: "",
    attachMandatory: true,
    enableTask: false,
    makeMandatory: false,
    linkToProject: "",
    approvals: [],
    projectsList: [],
    cycle: [],
    implementationDate: "",
    fillableSections: placement.fillableSections,
    id: placement.id,
    employeeID: profile.uid,
  }
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (isLoaded(timesheets_data) && !isEmpty(timesheets_data)) {
      setState((prevState) => ({
        ...prevState,
        cycle: timesheets_data.cycle,
        approvalBy: timesheets_data.approvalBy[0],
        attachMandatory: timesheets_data.attachMandatory,
        enableTask: timesheets_data.enableTask,
        makeMandatory: timesheets_data.makeMandatory,
        linkToProject: timesheets_data.linkToProject,
      }))
      const reqCycle = timesheets_data.cycle[timesheets_data.cycle.length - 1]
      const { range, startDay, date } = reqCycle
      setState((prevState) => ({
        ...prevState,
        timesheetCycle: range.toString(),
        startDay,
        implementationDate: date,
      }))
    } else {
      setState(() => ({
        ...initState,
        implementationDate: placement.startDate,
      }))
    }
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
      approvals,
      projectsList,
    }))
    // return () => setState(() => ({ ...initState }))
  }, [timesheets_data, placement, approvals])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {}
    Object.entries(state).forEach(([key, value]) => {
      if (
        key !== "fillableSections" &&
        key !== "id" &&
        key !== "employeeID" &&
        key !== "approvals" &&
        key !== "timesheetCycle" &&
        key !== "cycle" &&
        key !== "startDay" &&
        key !== "implementationDate" &&
        key !== "projectsList" &&
        key !== "approvalBy"
      ) {
        payload[key] = value
      }
    })
    payload["approvalBy"] = [state.approvalBy]
    payload["cycle"] = [
      ...state.cycle,
      {
        range: parseInt(state.timesheetCycle),
        startDay: state.startDay,
        date: state.implementationDate,
      },
    ]
    //payload["companyIDs"] = [state.approvalBy]
    if (state.fillableSections.includes("timesheets")) {
      addSectionToPlacement(payload, "timesheets", state.employeeID, state.id, callback)
    } else {
      updatePlacement(payload, "timesheets", state.employeeID, state.id, callback)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const callback = () => {}

  const handleChecked = (event) => {
    const { name, checked } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleKeyValuePair = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

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

  if (isLoaded(timesheets_data) && state.approvals.length) {
    return (
      <Presentation
        {...state}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleChecked={handleChecked}
        handleKeyValuePair={handleKeyValuePair}
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
    timesheets_data: state.firestore.data.timesheets_data,
    approvals: Object.entries(state.firestore.data.names)
      .map(([key, value]) => {
        return {
          ...value,
        }
      })
      .filter((employee) => {
        const timesheetMangers = state.employee.employeeModules.allModules
          .filter((item) => item.uid !== ownProps.placement.employeeID)
          .filter(
            (item) =>
              item.accessibles.includes("console-customization") ||
              item.accessibles.includes("timesheets-manager")
          )
          .map((ele) => ele.uid)
        return timesheetMangers.includes(employee.uid)
      }),
    projectsList: state.firestore.ordered.projectsList,
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
                doc: "timesheets",
                storeAs: "timesheets",
              },
            ],
            storeAs: "placement_timesheets",
          },
        ],
        storeAs: "timesheets_data",
      },
    ]
  })
)(Container)
