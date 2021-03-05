import React from "react"
import { connect } from "react-redux"
import RenderProfile from '../Services/EmployeeManagment/components/EmployeeProfile/Index/index'

function EmployeeProfilePage(props) {
  const { auth } = props
  return (
      <RenderProfile employeeID={auth.uid} {...props}  />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(EmployeeProfilePage)