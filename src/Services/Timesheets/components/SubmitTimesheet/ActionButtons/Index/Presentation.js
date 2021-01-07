import React from 'react'
import { Button } from "@material-ui/core"

function Presentation() {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => successAlert("submit")}
        disabled={standardTimeArr.length < 1 || isFutureDatesIncluded || isAlreadySubmitted || [attachMandatory ? timesheetDocURL : 'empty', placementID].includes("")}
        endIcon={<Icon>send</Icon>}
      >
        Submit
      </Button>
    </div>
  )
}

export default Presentation
