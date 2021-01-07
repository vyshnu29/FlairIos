import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { createClient } from "../../../middleware"
import { useHistory } from "react-router-dom"

function Container(props) {
  const [activeStep, setActiveStep] = useState(0)
  const history = useHistory()
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleFinish = () => {
    props.createClient(history)
  }

  return (
    <div>
      <Presentation
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        newClient={props.newClient}
        handleFinish={handleFinish}
      />
    </div>
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
