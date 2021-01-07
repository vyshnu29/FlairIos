import React from "react"
import { Stepper, Step, StepLabel, Button } from "@material-ui/core"
import useStyles from "../../../styles/stepperStyles"
import BusinessInformation from "../newClientComponents/BusinessInformation"
import Contacts from "../newClientComponents/Contacts/Index"
import Accounts from "../newClientComponents/Accounts"
import Locations from "../newClientComponents/Locations/Index"
import validate from "../../../../../shared/validation"

function getSteps() {
  return ["Business Information", "Contacts", "Accounts", "Locations"]
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BusinessInformation />
    case 1:
      return <Contacts />
    case 2:
      return <Accounts />
    case 3:
      return <Locations />
    default:
      return
  }
}

function Presentation(props) {
  const { activeStep, handleNext, handleBack, handleFinish, newClient } = props
  const { businessInformation, contacts, locations } = newClient
  const classes = useStyles()
  const steps = getSteps()
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <div className={classes.instructions}>
            <div className="custom-card">{getStepContent(activeStep)}</div>
          </div>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
              Back
            </Button>
            {activeStep === 0 ? (
              <Button
                variant="contained"
                disabled={
                  !validate.checkName(businessInformation.businessName) ||
                  !validate.checkNumber(businessInformation.contactNumber) ||
                  !validate.checkWebsite(businessInformation.website) ||
                  !businessInformation.jobTerminationNotice ||
                  !businessInformation.category ||
                  !validate.checkName(businessInformation.businessDisplayName) ||
                  !validate.checkEmail(businessInformation.email) ||
                  !businessInformation.netTerms.trim() ||
                  businessInformation.federalId.trim().length !== 8 ||
                  !businessInformation.invoiceLocation.line1.trim() ||
                  !businessInformation.invoiceLocation.city.trim() ||
                  !validate.checkZip(businessInformation.invoiceLocation.zipCode) ||
                  !businessInformation.invoiceLocation.state ||
                  !businessInformation.invoiceLocation.country ||
                  !(
                    businessInformation.fax.length === 0 ||
                    validate.checkNumber(businessInformation.fax)
                  )
                }
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : activeStep === 1 ? (
              <Button
                variant="contained"
                disabled={!contacts.status}
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : activeStep === 2 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            ) : activeStep === 3 ? (
              <Button
                variant="contained"
                color="primary"
                disabled={!locations.status}
                onClick={handleFinish}
              >
                Finish
              </Button>
            ) : null}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={
                activeStep === steps.length - 1 ? handleFinish : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Presentation
