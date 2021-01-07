import React from "react"
import Presentation from "./Presentation"

function Container(props) {
  return (
      <Presentation accounts={props.accounts} clientID={props.client.id} />
  )
}

export default Container
