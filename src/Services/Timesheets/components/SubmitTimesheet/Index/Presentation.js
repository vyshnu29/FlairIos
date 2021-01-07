import React, { useContext } from 'react'
import { Context } from "../component_state/context"
import { Autocomplete } from "@material-ui/lab";
import {
  Grid,
  Paper
} from '@material-ui/core'
import SelectPlacement from "../SelectPlacement"
import Document from "../Document"
import RangeSelector from "../RangeSelector"
import EntryTable from "../EntryTable"
import SubmitButton from "../ActionButtons/SubmitButton"
import UpdateButton from "../ActionButtons/UpdateButton"
function Presentation(props) {
  return (
    <div>
      <Paper className="p-2" >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <SelectPlacement {...props} />
            <Document type={props.match.params.type} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <RangeSelector {...props} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <EntryTable />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div >
              <SubmitButton />
              <UpdateButton />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Presentation
