import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { createClient } from "../../../middleware"


function Container(props) {
  const [activeStep, setActiveStep] = useState(0)
  
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleFinish = () => {
    props.createClient()
  }

  return (
      <Presentation
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        newClient={props.newClient}
        handleFinish={handleFinish}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    newClient: state.client.newClient,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createClient: (history) => {
      dispatch(createClient(history))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
