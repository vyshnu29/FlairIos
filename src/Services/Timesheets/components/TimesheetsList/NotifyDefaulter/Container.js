import React, { useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { useSelector } from "react-redux"
import { connect } from "react-redux"

function Container(props) {
  const { employeeID, isRejected, isDefaulter, email, name, timesheetManager } = props.row
  const { loggedInEmployee } = props
  const [state, stateSetter] = useState({
    open: false,
    description: "",
    hideBtn: true,
    email: email,
    subject: "Defaulter Timesheet",
    body: `Hey ${name}, you need to submit your pending timesheet.`,
    name: name
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
    if (timesheetManager.includes(loggedInEmployee) && isDefaulter) {
      setState({ hideBtn: false })
    }
  }, [isDefaulter])


  const handleClickOpen = () => {
    setState({ open: true })
  };
  const handleClose = () => {
    setState({ open: false })
  };

  const onNotify = () => {

  }

  return (
    <div>
      <Presentation
        state={state}
        setState={setState}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        setState={setState}
        onNotify={onNotify}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInEmployee: state.firebase.auth.uid
  }
}


export default connect(mapStateToProps)(Container)