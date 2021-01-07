import React from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"

function Container(props) {
  const { id, loggedInEmployee } = props
  return <Presentation id={id} loggedInEmployee={loggedInEmployee} />
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInEmployee: state.firebase.auth.uid,
  }
}

export default connect(mapStateToProps)(Container)
