import React, { useEffect, useState, useContext } from 'react'
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Spinner from "react-native-loading-spinner-overlay"
import { connect } from "react-redux"
import { Context } from "../component_state/context"

function Container(props) {
  const { timesheets, loggedInEmployee, settings_info, condition, modules } = props
  const [state, handle] = useContext(Context)

  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }
  useEffect(() => {
    setState({
      isFetchingTimesheets: true
    })
    handle({
      type: "LOAD_TIMESHEETS",
      condition: condition,
      employeeID: state.listAll ? loggedInEmployee : state.employeeID,
      isManager: state.listAll ? modules.includes("timesheets-manager") || props.modules.includes("console-customization") : false,
      setState
    })
  }, [condition, state.loadComponent, state.listAll, state.employeeID])

  useEffect(() => {
    setState({
      isSettingsLoading: true
    })
    if (!state.isFetchingTimesheets) {
      const placements = state[condition].map(item => item.placementID)
      handle({
        type: "LOAD_SETTINGS",
        placementIDs: placements,
        setState
      })
    }
  }, [state.isFetchingTimesheets])



  console.log(state)
  if(!isLoaded(timesheets))
  return (
      <Presentation
        state={state}
        isLoaded={isLoaded(timesheets)}
        timesheets={timesheets}
        settings_info={settings_info}
        loggedInEmployee={loggedInEmployee}
        condition={condition}
        {...props}
      />
  )
  return (<Spinner visible={true} />)
}


const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    timesheets: state.firestore.ordered.timesheets,
    settings_info: state.timesheets.info.settings_info
  }
}


export default connect(mapStateToProps)(Container)