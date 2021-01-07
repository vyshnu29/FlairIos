import React from "react"
import { connect } from "react-redux"
import { setPaymentAmount } from "../../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  return (
    <div>
      <Presentation {...props} />
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: (index, value) => {
      dispatch(setPaymentAmount(index, value))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
