import React from "react"
import Presentation from "./Presentation"

function Container(props) {
  return (
    <div>
      <Presentation {...props} />
    </div>
  )
}

export default Container
