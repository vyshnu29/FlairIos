import React, { useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { rejectTimesheet } from "../../../middleware"
import { connect } from "react-redux"

function Container(props) {
  const { employeeID, placementID, timesheetID, isApproved, isRejected, isDefaulter, timesheetManager, isInvoiced } = props.row
  const { _reject_timesheet, loggedInEmployee } = props
  const [state, stateSetter] = useState({
    open: false,
    description: "",
    hideBtn: true
  })

  const setState = (obj) => {
    stateSetter(prevState => ({
      ...prevState,
      ...obj
    }))
  }

  useEffect(() => {
    // button hide conditions
    /* 
      1) His own timesheet
      2) if rejected
      3) if defaulter
    */
    // timesheetManager.includes(loggedInEmployee) &&
    if (loggedInEmployee !== employeeID && !isRejected && !isDefaulter && !isInvoiced) {
      setState({ hideBtn: false })
    }
  }, [isRejected, isDefaulter, isInvoiced])

  const onReject = () => {
    // sending payload as empty for now, in future there may be possibility of sending non-empty
    handleClose()
    _reject_timesheet({ reason: state.description }, employeeID, placementID, timesheetID)
  }


  const handleClickOpen = () => {
    setState({ open: true })
  };
  const handleClose = () => {
    setState({ open: false })
  };

  return (
    <div>
      <Presentation
        state={state}
        setState={setState}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onReject={onReject}
        employeeID={employeeID}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInEmployee: state.firebase.auth.uid
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    _reject_timesheet: (payload, employeeID, placementID, timesheetID) => dispatch(rejectTimesheet(payload, employeeID, placementID, timesheetID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
