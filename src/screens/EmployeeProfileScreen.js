import React from "react"
import EmployeeProfile from "../Services/EmployeeManagment/components/MenuBar"

function EmployeeProfilePage(props) {
 
  const id = props.route.params.ID
  return (
      <EmployeeProfile Id={id} {...props} />
  )
}

export default EmployeeProfilePage