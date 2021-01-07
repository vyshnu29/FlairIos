import React from 'react'
import { GoFileSymlinkFile } from 'react-icons/go'
import { Button, Typography, LinearProgress } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';


function Presentation(props) {
  const { state, handleDocumentSubmit } = props
  if (!state.isSettingsLoaded)
    return (
      <div>
        <Typography component="div" variant={"h3"}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant={"body1"}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant={"caption"}>
          <Skeleton />
        </Typography>
      </div>
    )
  return (
    <div>
      <div className="mt-2 mb-2">
        <br />
        <input
          className='d-none'
          id="contained-button-file-ehfile"
          multiple
          type="file"
          onChange={handleDocumentSubmit}
        />
        {
          state.timesheetSettings.attachMandatory ?
            <div>
              <label htmlFor="contained-button-file-ehfile">
                <Button disabled={!state.selectedRange.length} fullWidth variant="contained" color="primary" component="span">
                  Upload Document
                  </Button>
              </label>
              <p>{state.timesheetInfo.attachmentDetails.publicURL !== "" ? <a target="_blank" rel="noopener noreferrer" href={state.timesheetInfo.attachmentDetails.publicURL} ><GoFileSymlinkFile size={22} /></a> : <p>No file choosen</p>} </p>
              {
                state.isDocumentUploading ? "Uploading..." : ""
              }
            </div>
            :
            null
        }

      </div>
    </div>
  )
}

export default Presentation
