import React, { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import Presentation from "./Presentation"
import { loadClientInvoices } from "../../../middleware"

function Container(props) {
  const { getClientInvoices, clientInvoices, isLoaded, state,clientID} = props
 
  useEffect(() => {
    if (clientID !== "") getClientInvoices(clientID)
  }, [clientID])

  

  return (
      <Presentation
        state={state}
        clientInvoices={clientID === "" ? [] : clientInvoices}
        isLoading={!isLoaded}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.payments.paymentsList
  return { ...firestore }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getClientInvoices: (clientID) => {
      dispatch(loadClientInvoices(clientID))
    },
    
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Container)
