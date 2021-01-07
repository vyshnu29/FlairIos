import React from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"

function Container(props) {
  return (
    <div>
      <Presentation {...props} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clientInvoices: state.payments.paymentsList.clientInvoices,
  }
}

export default connect(mapStateToProps, null)(Container)
