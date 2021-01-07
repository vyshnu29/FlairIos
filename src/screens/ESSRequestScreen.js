import React from "react"
import EssRequest from "../Services/LetterRequests/components/MyRequests/Index/index"

function EssRequests(props) {
  return (
      <EssRequest myReq={true} {...props} text= "Ess Requests" />
  )
}

export default EssRequests