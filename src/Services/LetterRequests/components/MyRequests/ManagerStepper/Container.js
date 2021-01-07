import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { approveLetterRequest } from "../../../middleware/index.js"
import { requestHTMLContent } from "../../../middleware/letterRequest.js"
import Presentation from "./Presentation"
function Container(props) {
  const [state, stateSetter] = useState({
    letter: "",
    today_date: "",
    signature: "",
    description: "",
    gettingContent: false,
    letterContent: "",
  })
  const [description, setDesc] = useState("")
  const [activeStep, setActiveStep] = React.useState(0)
  const setState = (obj) => {
    stateSetter((prevState) => ({
      ...prevState,
      ...obj,
    }))
  }
  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value)))
      setState({
        ...state,
        [key]: new Date(value).toISOString(),
      })
  }
  const handleDesc = (key, value) => {
    setDesc(value)
  }
  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  const handleGrant = async (e) => {
    e.preventDefault()
    const { letter, today_date, signature } = state
    // const [state, dispatch] = context
    const { approve_letter_requests, reqData, signatures } = props
    let signatureID = signatures.filter((i) => i.employeeID === signature)
    let employeeDes =
      props[`employee_profile_${props.reqData.uid}`].personal.jobtitle

    let data = {
      issuedLetterID: letter,
      letterIssueDate: today_date,
      employeeSignatureID: signatureID[0].id,
      authorisedPersonID: signature,
      authorisedPersonDesignation: employeeDes,
      authorisedPersonName: reqData.employeename,
      formattedHTML: "<div></div>",
      description: description,
    }
    console.log(data)
    let employeeID = reqData.uid
    let requestID = reqData.requestid
    approve_letter_requests(data, employeeID, requestID)

    clearValues()
  }
  const getSelectedLetterContent = async () => {
    console.log("activated")
    if (state.letter !== "") {
      // setState({
      //   ...state,
      //   gettingContent: true,
      // })
      console.log("activatedalert")

      // const [state, dispatch] = context
      const { letter, today_date, signature } = state

      const { request_html_content, reqData, signatures } = props
      let signatureID = signatures.filter((i) => i.employeeID === signature)
      let employeeDes = props[`employee_profile_${props.reqData.uid}`].role
      let data = {
        letterIssueDate: today_date,
        letterIssueID: letter,
        authorisedEmployeeDetails: {
          employeeID: reqData.uid,
          employeeName: reqData.employeename,
          signatureID: signatureID[0].id,
          employeeDesignation: employeeDes,
        },
      }
      let payload = {
        employeeID: reqData.uid,
        requestID: reqData.requestid,
        data,
      }
      request_html_content(payload)
      // request_html_content(payload)
    }
  }
  const clearValues = () => {
    setState({
      ...state,
      letter: "",
      today_date: "",
      signature: "",
      description: "",
      gettingContent: false,
      letterContent: "",
    })
  }
  const response = (bool, content) => {
    setState({
      ...state,
      gettingContent: false,
    })
    if (bool) {
      setState({
        ...state,
        letterContent: content,
      })
    }
  }


  if (isLoaded(props[`employee_profile_${props.reqData.uid}`])) {
       let employee = props[`employee_profile_${props.reqData.uid}`]
    return (
      <div>
        <Presentation
          {...props}
          description={description}
          handleDesc={handleDesc}
          letterContent={state.letterContent}
          gettingContent={state.gettingContent}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleGrant={handleGrant}
          clearValues={clearValues}
          employee={employee}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          getSelectedLetterContent={getSelectedLetterContent}
          state = {state}
        />
      </div>
    )
  }
  return <p>Loading...</p>
}

const mapStateToProps = (state, ownProps) => {
  return {
    [`employee_profile_${ownProps.reqData.uid}`]: state.firestore.ordered[
      `employee_profile_${ownProps.reqData.uid}`
    ]
      ? state.firestore.ordered[`employee_profile_${ownProps.reqData.uid}`][0]
      : state.firestore.ordered[`employee_profile_${ownProps.reqData.uid}`],
    stateLetterContent: state.letterRequests.letterRequestsList["htmlContent"],
    isLoadingLetterContent:
      state.letterRequests.letterRequestsList["htmlContent"].isLoading,
    loggedInEmployee: state.firebase.auth.uid,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request_html_content: (payload) => {
      dispatch(requestHTMLContent(payload))
    },
    approve_letter_requests: (data, employeeID, requestID) => {
      dispatch(approveLetterRequest(data, employeeID, requestID))
    },
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "EMPLOYEES",
        doc: props.reqData.uid,
        storeAs: `employee_profile_${props.reqData.uid}`,
      },
    ]
  })
)(Container)
