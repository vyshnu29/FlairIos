import React, { useContext, useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { submitTimesheet } from "../../../../middleware"
import { Context } from "../../component_state/context"
import { useHistory } from "react-router-dom"

function Container(props) {
  const { _submit_timesheet, loggedInEmployee } = props
  const [open, setOpen] = useState(false);
  const [state, handle] = useContext(Context)
  const [disableBtn, setDisableBtn] = useState(true)
  const history = useHistory();

  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  useEffect(() => {
    // button disabled conditions
    /* 
      1) if standard arr is empty
    */

    setDisableBtn(true)
    if (state.timesheetSettings.attachMandatory && !state.timesheetInfo.attachmentDetails.publicURL.length)
      return setDisableBtn(true)

    if (state.standardTime.length > 0 && !state.isDocumentLoading && !state.isAlreadySubmitted)
      setDisableBtn(false)

  }, [state.standardTime.length, state.isDocumentLoading, state.timesheetInfo.attachmentDetails.publicURL, state.isAlreadySubmitted])


  const onSubmit = () => {
    handleClose();
    const { timesheetStartDate, timesheetEndDate, standardTime, OTtime, placementID, publicURL, fileExtension, sourcePath, timesheetInfo } = state
    const timesheet = {
      ...timesheetInfo,
      workdetails: {
        standardTime: standardTime,
        OTtime: OTtime
      },
      fileExtension,
    }

    setState({
      isSubmitting: true
    })

    _submit_timesheet(timesheet, loggedInEmployee, placementID, history)
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
        handleClickOpen={handleClickOpen}
        onSubmit={onSubmit}
        handleClose={handleClose}
        open={open}
        state={state}
        disableBtn={disableBtn}
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
    _submit_timesheet: (payload, employeeID, placementID, history) => dispatch(submitTimesheet(payload, employeeID, placementID, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)