import React, { useState } from "react"
import { connect } from "react-redux"
import { requestLetter } from "../../../middleware"
import Presentation from "./Presentation"
import { useHistory } from "react-router-dom"

function Container(props) {
  console.log(props)
  const history = useHistory()

  const handleRequest = (type, description, req_doc, univDetails) => {
    const { request_letter, state, employee } = props
    console.log(type, description, req_doc, univDetails, state)

    let data = {
      description: description,
      attachmentDetails: {
        publicURL: req_doc,
        sourcePath: "",
      },
      additionalInformation: {
        universityDetails: univDetails,
        employeeDetails: {
          firstname: employee.personal.firstname,
          lastname: employee.personal.lastname,
          middlename: employee.personal.middlename,
          gender: employee.personal.gender,
          jobtitle: employee.personal.jobtitle,
          dateofjoining: employee.personal.dateofjoining,
        },
      },
    }
    let payload = {
      employeeID: state,
      type: type,
      data,
    }
    console.log(payload)
    request_letter(payload, history)
  }
  return (
    <div>
      <Presentation {...props} handleRequest={handleRequest} />
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  console.log(state.firebase.profile)
  return {
    employee: state.firebase.profile,
    state: state.firebase.auth.uid,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request_letter: (payload, history) => {
      dispatch(requestLetter(payload, history))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container)
