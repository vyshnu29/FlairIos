import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"

function Container(props) {
  const { clients } = props
  const [state, setState] = useState({
    clientId: "",
  })

  const clearState = () => {
    setState((state) => ({
      ...state,
      clientId: "",
    }))
  }

  const handleChange = (key, value) => {
    // clearState()
     console.log("Aa",value)
    setState((state) => ({ ...state, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }



  return (
      <Presentation
        state={state}
        clients={clients}
        {...props}
        clientID = {state.clientId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        clearState={clearState}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clients: Object.entries(state.firestore.data.clients_meta_info).map(([key, value]) => value),
  }
}

export default connect(mapStateToProps)(Container)
