import React, { useContext } from 'react'
import { Context } from "../component_state/context"
import { Autocomplete } from "@material-ui/lab";
import {
  TextField
} from '@material-ui/core'

function Presentation(props) {
  const { setState, state } = props
  const placements = state.placements
  return (
    <div>
      <Autocomplete
        options={Object.values(placements)}
        renderOption={(option) => {
          return (
            <span>
              {option.placementID}
            </span>
          );
        }}
        getOptionLabel={(option) => option.placementID}
        value={placements[state.placementID]}
        onChange={(e, v) => {
          if (v) {
            setState({
              placementID: v.placementID,
              clientId: v.clientId
            })
          }
        }}
        renderInput={(params) => (
          <TextField required size="small" {...params} label="Select Placement" />
        )}
      />
    </div>
  )
}

export default Presentation
