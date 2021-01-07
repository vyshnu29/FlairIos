import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {ActivityIndicator} from "react-native"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"

function Container(props) {
  const {
    expenseDetails_data,
    approvalManagers,
    placement,
    addSectionToPlacement,
    profile,
    updatePlacement,
  } = props

  const initState = {
    approvalBy: [],
    approvalManagers: [],
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
  }

  const [state, setState] = useState(initState)

  const handleEmployees = (value) => {
    setState({ ...state, approvalBy: value })
  }

  useEffect(() => {
    if (isLoaded(expenseDetails_data) && !isEmpty(expenseDetails_data)) {
      setState((prevState) => ({
        ...prevState,
        approvalBy: expenseDetails_data.approvalBy,
      }))
    } else {
      setState(() => ({ ...initState }))
    }
    setState((prevState) => ({
      ...prevState,
      approvalManagers,
      fillableSections: placement.fillableSections,
      id: placement.id,
    }))
    //return () => setState(() => ({ ...initState }))
  }, [expenseDetails_data, approvalManagers, placement])

  const callback = () => {}

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.fillableSections.includes("expense_details")) {
      console.log("create")
      addSectionToPlacement(
        { approvalBy: state.approvalBy },
        "expense_details",
        state.employeeID,
        state.id,
        callback
      )
    } else {
      updatePlacement(
        { approvalBy: state.approvalBy },
        "expense_details",
        state.employeeID,
        state.id,
        callback
      )
    }
  }

  if (isLoaded(expenseDetails_data)) {
    return (
      <Presentation
        {...state}
        handleSubmit={handleSubmit}
        handleEmployees={handleEmployees}
      />
    )
  }

  return (
    <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    expenseDetails_data: state.firestore.data.expenseDetails_data,
    approvalManagers: Object.entries(state.firestore.data.names)
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
                doc: "expense_details",
                storeAs: "expenseDetails",
              },
            ],
            storeAs: "placement_expenseDetails",
          },
        ],
        storeAs: "expenseDetails_data",
      },
    ]
  })
)(Container)
