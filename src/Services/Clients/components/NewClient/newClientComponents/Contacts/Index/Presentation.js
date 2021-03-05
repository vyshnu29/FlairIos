import React from "react"
import Form from "../Form"

function Presentation(props) {
  const {
    contactsList,
    value,
    handleTabChange,
    addContact,
    deleteContact,
  } = props
  return (
    <Form
                contactsList={contactsList}
              />
  )
}

export default Presentation
