import React, { useContext, useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { updateTimesheet } from "../../../../middleware"
import { Context } from "../../component_state/context"
import { useHistory } from "react-router-dom"

function Container(props) {
  const { _update_timesheet, loggedInEmployee } = props
  const [open, setOpen] = useState(false);
  const [state] = useContext(Context)
  const [disableBtn, setDisableBtn] = useState(true)
  const history = useHistory();


  useEffect(() => {
    // button disabled conditions
    /* 
      1) if standard arr is empty
    */

    setDisableBtn(true)
    if (state.timesheetSettings.attachMandatory && !state.timesheetInfo.attachmentDetails.publicURL.length)
      return setDisableBtn(true)

    if (state.standardTime.length > 0 && !state.isDocumentLoading)
      setDisableBtn(false)

  }, [state.standardTime.length, state.isDocumentLoading, state.timesheetInfo.attachmentDetails.publicURL])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onUpdate = () => {
    handleClose();
    const { timesheetStartDate, timesheetEndDate, standardTime, OTtime, placementID, timesheetID, publicURL, fileExtension, sourcePath, timesheetInfo } = state
    const timesheet = {
      ...timesheetInfo,
      workdetails: {
        standardTime: standardTime,
        OTtime: OTtime
      },
    }

    _update_timesheet(timesheet, loggedInEmployee, placementID, timesheetID, history)
  }

  return (
    <div>
      <Presentation
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        state={state}
        disableBtn={disableBtn}
        onUpdate={onUpdate}
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
    _update_timesheet: (payload, employeeID, placementID, timesheetID, history) => dispatch(updateTimesheet(payload, employeeID, placementID, timesheetID, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)