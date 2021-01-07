import React, { useState } from "react"
import Presentation from "./Presentation"
export default function Container(props) {
  const [state, setState] = useState({
    letter: "",
    today_date: "",
    signature: "",
    description: "",
  })
  return (
    <div>
      {Object.keys(props.reqData).length ? (
        <Presentation {...props} {...props.info} />
      ) : null}
    </div>
  )
}
