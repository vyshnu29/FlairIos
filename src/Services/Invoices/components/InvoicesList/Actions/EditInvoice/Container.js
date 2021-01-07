import React from 'react'
import Presentation from "./Presentation"
import { useHistory } from "react-router-dom"
function Container(props) {
  const history = useHistory();
  const { row } = props

  const goToEditPage = () => {
    const { id } = row
    return history.push(`/console/invoiceslist/edit?invoiceID=${encodeURIComponent(id)}`)
  }
  return (
    <div>
      <Presentation {...props} goToEditPage={goToEditPage} />
    </div>
  )
}

export default Container
