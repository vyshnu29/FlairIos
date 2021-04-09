
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { requestHTMLContent, setState } from "../../../middleware/letterRequest"
import Presentation from "./Presentation"
function Container(props) {
  const [letterHtmlContent, setHtmlContent] = useState("")
  const [open, setOpen] = React.useState(false)
  const { request_html_content, reqData, set_state, previewDialog } = props

  const handleClickOpen = () => {
    requestHtml()
    set_state({
      previewDialog: reqData.id,
    })
  }

  // useEffect(() => {
  //   requestHtml()
  // }, [])
  
  const handleClose = () => {
    set_state({
      previewDialog: "",
    })
  }
  
  const requestHtml = () => {
    let data = {
      letterIssueDate: reqData.approvedDetails.letterIssueDate,
      letterIssueID: reqData.approvedDetails.issuedLetterID,
      authorisedEmployeeDetails: {
        employeeID:
          reqData.approvedDetails.authorisedEmployeeInformation.employeeID,
        employeeName:
          reqData.approvedDetails.authorisedEmployeeInformation.employeeName,
        signatureID:
          reqData.approvedDetails.authorisedEmployeeInformation
            .employeeSignatureID,
        employeeDesignation:
          reqData.approvedDetails.authorisedEmployeeInformation
            .employeeDesignation,
      },
    }
    let payload = {
      employeeID: reqData.uid,
      requestID: reqData.requestid,
      data,
    }

   // console.log(payload)
 
    request_html_content(payload)

    //handleClose()
  }
  //   useEffect(() => {
 

  //   }, [previewDialog === reqData.id])
  return (
      <Presentation
        {...props}
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    previewDialog: state.letterRequests.letterRequestsList["previewDialog"],
    htmlContentS: state.letterRequests.letterRequestsList["htmlContent"],
    isLoadingLetterContent:
      state.letterRequests.letterRequestsList["htmlContent"].isLoading,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request_html_content: (payload) => {
      dispatch(requestHTMLContent(payload))
    },
    set_state: (obj) => {
      dispatch(setState(obj))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container)