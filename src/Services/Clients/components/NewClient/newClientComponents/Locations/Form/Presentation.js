import React from "react"
import { Grid, TextField, Button } from "@material-ui/core"
import validate from "../../../../../../../shared/validation"
import CountryAndState from "../../../../../../../shared/countryAndState"

function Presentation(props) {
  const { location, handleChange, onSubmit, handleKeyValuePair } = props
  return (
    <div className="custom-card">
      <form onSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              label="Address Line 1"
              name="locationsline1"
              value={location.locationsline1}
              variant="outlined"
              helperText={
                location.locationsline1.length
                  ? validate.checkAddress(location.locationsline1)
                    ? ""
                    : "Enter valid address"
                  : ""
              }
              size="small"
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Address Line 2"
              name="locationsline2"
              value={location.locationsline2}
              helperText={
                location.locationsline2.length
                  ? validate.checkAddress(location.locationsline2)
                    ? ""
                    : "Enter valid address"
                  : ""
              }
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="City"
              name="locationscity"
              value={location.locationscity}
              helperText={
                location.locationscity.length
                  ? validate.checkAddress(location.locationscity)
                    ? ""
                    : "Enter valid address"
                  : ""
              }
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8}>
            <CountryAndState
              handleKeyValuePair={handleKeyValuePair}
              countries={location.countries}
              states={location.states}
              state={location.locationsstate_name}
              country={location.locationscountry}
              spacing={1}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip code"
              name="locationszip"
              value={location.locationszip}
              helperText={
                location.locationszip.length
                  ? validate.checkZip(location.locationszip)
                    ? ""
                    : "Enter valid zip code"
                  : ""
              }
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <div className="text-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !location.locationsline1.trim() ||
              !location.locationscountry.trim() ||
              !location.locationscity.trim() ||
              !location.locationsstate_name.trim() ||
              !validate.checkZip(location.locationszip)
            }
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Presentation
