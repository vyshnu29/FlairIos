import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { rejectLetterRequest } from "../../../middleware"
import Presentation from "./Presentation"
function Container(props) {
  const [state, stateSetter] = useState({
    description: "",
  })

  const setState = (obj) => {
    stateSetter((prevState) => ({
      ...prevState,
      ...obj,
    }))
  }
  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  const handleReject = () => {
    const { reject_letter_request } = props
    let employeeID = props.id
    let requestID = props.reqId
    let description = state.description
    reject_letter_request(description, employeeID, requestID)
    console.log(state)
    //  const dispatch = this.context[1]
    //  dispatch({
    //    type: OFFICER_REJECT_LETTER,
    //    payload: {
    //      offerLetterId: this.props.id,
    //      description: this.state.description,
    //    },
    //  })
  }

  return (
    <div>
      <Presentation
        {...state}
        {...props}
        handleChange={handleChange}
        handleReject={handleReject}
      />
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    loggedInEmployee: state.firebase.auth.uid,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reject_letter_request: (description, employeeID, requestID) => {
      dispatch(rejectLetterRequest(description, employeeID, requestID))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container)
