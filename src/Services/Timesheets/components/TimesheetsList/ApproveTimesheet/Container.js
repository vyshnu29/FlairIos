import React, { useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { approveTimesheet } from "../../../middleware"
import { connect } from "react-redux"

function Container(props) {
  console.log(props)
  const { employeeID, placementID, timesheetID, isApproved, isRejected, isDefaulter, timesheetManager } = props.row
  const { _approve_timesheet, loggedInEmployee } = props
  const [open, setOpen] = useState(false);
  const [hideBtn, setHideBtn] = useState(true)

  useEffect(() => {
    // button hide conditions
    /* 
      1) if it is not his/her own timesheet
      2) if it is not approved
      3) if it is not defaulter
    */
    if (loggedInEmployee !== employeeID && !isApproved && !isDefaulter) {
      setHideBtn(false)
    }
  }, [isApproved, isDefaulter])

  const onApprove = () => {
    // sending payload as empty for now, in future there may be possibility of sending non-empty
    handleClose()
    _approve_timesheet({}, employeeID, placementID, timesheetID)
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Presentation
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onApprove={onApprove}
        hideBtn={hideBtn}
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
    _approve_timesheet: (payload, employeeID, placementID, timesheetID) => dispatch(approveTimesheet(payload, employeeID, placementID, timesheetID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
