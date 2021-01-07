import React from "react"
import { connect } from "react-redux"
import { deleteClient } from "../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  return <Presentation {...props} />
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: (id) => {
      dispatch(deleteClient(id))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
