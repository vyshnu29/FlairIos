import React from "react"
import Deductions from "../Services/Deductions/components/CreateDeductions"

function DeductionListScreen(props) {
  return (

      <Deductions listAll={true} id={null} {...props} />
  )
}

export default DeductionListScreen
