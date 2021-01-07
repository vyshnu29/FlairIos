import React from "react"
import { TextField, makeStyles, Button, Drawer, Grid } from "@material-ui/core"
import { FiEdit3 } from "react-icons/fi"
import { Edit as EditIcon } from "@material-ui/icons"
import CountryAndState from "../../../../../../../shared/countryAndState"
import validate from "../../../../../../../shared/validation"

const useStyles = makeStyles({
  setDrawer: {
    width: "380px",
  },
})

function Presentation(props) {
  const { handleChange, state, handleSubmit, handleKeyValuePair } = props
  const [drawerState, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...drawerState, [anchor]: open })
  }

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <EditIcon />{" "}
      </Button>
      <Drawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <div className="m-3">
          <div className="text-center">
            <FiEdit3 fontSize="50px" />
            <h3>
              <u>Edit Invoice Location</u>
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Address Line 1"
                  name="line1"
                  value={state.line1}
                  variant="outlined"
                  helperText={
                    state.line1.length
                      ? validate.checkAddress(state.line1)
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
              <Grid item xs={6}>
                <TextField
                  label="line2"
                  name="line2"
                  value={state.line2}
                  helperText={
                    state.line2.length
                      ? validate.checkAddress(state.line2)
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
              <Grid item xs={12}>
                <CountryAndState
                  handleKeyValuePair={handleKeyValuePair}
                  countries={state.countries}
                  states={state.states}
                  state={state.state}
                  country={state.country}
                  spacing={1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="city"
                  value={state.city}
                  helperText={
                    state.city.length
                      ? validate.checkAddress(state.city)
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

              <Grid item xs={6}>
                <TextField
                  label="Zip code"
                  name="zipCode"
                  value={state.zipCode}
                  helperText={
                    state.zipCode.length
                      ? validate.checkZip(state.zipCode)
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
                color="secondary"
                disabled={
                  !state.line1.trim() ||
                  !state.country.trim() ||
                  !state.city.trim() ||
                  !state.state.trim() ||
                  !validate.checkZip(state.zipCode)
                }
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default Presentation
