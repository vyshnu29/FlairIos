import React from "react"
import Form from "../Form"


function Presentation(props) {
  const {
    locationsList,
    value,
    handleTabChange,
    addLocation,
    deleteLocation,
  } = props
  return (
              <Form
                locationsList={locationsList}
              />
        
  )
}

export default Presentation
