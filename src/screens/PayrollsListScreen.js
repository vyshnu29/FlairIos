import React from "react"
import PayrollsList from "../Services/Payrolls/components/Index"

function PayrollsListScreen(props) {
  return (

      <PayrollsList {...props} listAll={true} id={null} />
 
  )
}

export default PayrollsListScreen
