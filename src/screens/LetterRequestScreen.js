import React from "react"
import LetterRequest from "../Services/LetterRequests/components/MyRequests/Index/index"

function LetterRequests(props) {
  return (
      <LetterRequest myReq={false} {...props} text= "Letter Requests"/>
  )
}

export default LetterRequests
