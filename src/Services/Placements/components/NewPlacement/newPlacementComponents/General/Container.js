import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { initiateNewPlacement, updatePlacement } from "../../../../middleware"


function Container(props) {
  const { placement, initiateNewPlacement, clients, updatePlacement } = props
  





  
 

  return (
    <Presentation
    placement={placement}
      {...props}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { clients_list } = state.firestore.ordered
  return {
    clients: clients_list,
  }
}


export default connect(mapStateToProps, null)(Container)
