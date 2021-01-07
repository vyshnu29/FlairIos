import React from "react"
import {
  TextField,
  MenuItem,
  Button,
  Drawer,
  IconButton,
  Grid,
} from "@material-ui/core"
import { FiEdit3 } from "react-icons/fi"
import { FcBusinessContact } from "react-icons/fc"
import CountryAndState from "../../../../../../../shared/components/countryAndState"
import validate from "../../../../../../../shared/validation"

function Presentation(props) {
  const {
    handleChange,
    location,
    handleSubmit,
    handleKeyValuePair,
    btnContent,
    edit,
  } = props
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
      <IconButton onClick={toggleDrawer("right", true)}>
        {btnContent}{" "}
      </IconButton>
      <Drawer
        anchor={"right"}
        open={drawerState["right"]}
        onMouseEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onClose={toggleDrawer("right", false)}
      >
        <div className="m-3">
          <div className="text-center">
            {edit ? (
              <>
                <FiEdit3 fontSize="50px" />
                <h3>
                  <u>Edit Contact</u>
                </h3>
              </>
            ) : (
              <>
                <FcBusinessContact fontSize="80px" />
                <h3>
                  <u>Add Contact</u>
                </h3>
              </>
            )}
          </div>
          <form className="mt-3" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={12}>
                <CountryAndState
                  handleKeyValuePair={handleKeyValuePair}
                  countries={location.countries}
                  states={location.states}
                  state={location.locationsstate_name}
                  country={location.locationscountry}
                  spacing={1}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                color={edit ? "secondary" : "primary"}
                disabled={
                  !location.locationsline1.trim() ||
                  !location.locationscountry.trim() ||
                  !location.locationscity.trim() ||
                  !location.locationsstate_name.trim() ||
                  !validate.checkZip(location.locationszip)
                }
              >
                {edit ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default Presentation
