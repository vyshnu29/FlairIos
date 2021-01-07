import React from "react"
import EditIcon from "@material-ui/icons/Edit"
import {
  TextField,
  MenuItem,
  makeStyles,
  Button,
  Drawer,
  Grid,
} from "@material-ui/core"
import { FiEdit3 } from "react-icons/fi"
import NumberFormatCustom from "../../../../../../shared/numberFormatCustom"
import {
  DoubleDigitFormatter,
  FederalIdPattern,
  MobileNumberFormatter,
} from "../../../../../../shared/customNumberFormats"
import validate from "../../../../../../shared/validation"
import { GoFileSymlinkFile } from "react-icons/go"

const useStyles = makeStyles({
  setDrawer: {
    width: "auto",
  },
})

const validateFederalId = (id) => {
  return id.trim().length === 8
}

function Presentation(props) {
  const { handleChange, state, isUploading, handleFile, handleSubmit } = props
  // const [state] =  React.useContext(DataContext)
  const [drawerState, setState] = React.useState({
    right: false,
  })
  const jobTerminationNoticeList = ["1-week", "2-weeks", "3-weeks", "4-weeks"]

  const categoryList = ["End Client", "Prime-Contractor", "Sub-Contractor"]

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...drawerState, [anchor]: open })
  }
  const classes = useStyles()
  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <EditIcon />{" "}
      </Button>
      <Drawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        className={classes.setDrawer}
      >
        <div className="m-3">
          <div className="text-center">
            <FiEdit3 fontSize="50px" />
            <h3>
              <u>Edit Client details</u>
            </h3>
          </div>
          <div className="mb-3"></div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Business Name"
                  helperText={
                    state.businessName.length
                      ? validate.checkName(state.businessName)
                        ? ""
                        : "Enter valid Business name"
                      : ""
                  }
                  name="businessName"
                  value={state.businessName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Business Display Name"
                  name="businessDisplayName"
                  helperText={
                    state.businessDisplayName.length
                      ? validate.checkName(state.businessDisplayName)
                        ? ""
                        : "Enter valid Business display name"
                      : ""
                  }
                  value={state.businessDisplayName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={state.email}
                  helperText={
                    state.email.length
                      ? validate.checkEmail(state.email)
                        ? ""
                        : "Enter valid email id"
                      : ""
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  helperText={
                    state.contactNumber.length
                      ? validate.checkNumber(state.contactNumber)
                        ? ""
                        : "Enter valid contact number"
                      : ""
                  }
                  value={state.contactNumber}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Federal ID"
                  placeholder="##-######"
                  name="federalId"
                  value={state.federalId}
                  helperText={
                    state.federalId.length
                      ? state.federalId.trim().length === 8
                        ? ""
                        : "Enter valid federalId"
                      : ""
                  }
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: FederalIdPattern,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Website"
                  name="website"
                  value={state.website}
                  helperText={
                    state.website.length
                      ? validate.checkWebsite(state.website)
                        ? ""
                        : "Enter valid website"
                      : ""
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Net Terms"
                  name="netTerms"
                  value={state.netTerms}
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: DoubleDigitFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Job Termination Notice"
                  name="jobTerminationNotice"
                  value={state.jobTerminationNotice}
                  onChange={handleChange}
                >
                  {jobTerminationNoticeList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  label="Client Category"
                  name="category"
                  value={state.category}
                  onChange={handleChange}
                >
                  {categoryList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Fax"
                  name="fax"
                  value={state.fax}
                  helperText={
                    state.fax.length
                      ? validate.checkNumber(state.fax)
                        ? ""
                        : "Enter valid fax number"
                      : ""
                  }
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Logo"
                  type="file"
                  name="images-waterMark"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleFile}
                />
                <p>
                  {state.logo !== "" ? (
                    <a target="_blank" rel="noopener noreferrer" href={state.logo}>
                      <GoFileSymlinkFile size={22} />
                    </a>
                  ) : (
                    <p>No file choosen</p>
                  )}{" "}
                </p>
                {isUploading ? <p>Uploading please wait...</p> : ""}
              </Grid>
            </Grid>
            <div className="text-center mt-3">
              <Button
                variant="contained"
                color={"secondary"}
                disabled={
                  !validate.checkName(state.businessName) ||
                  !validate.checkNumber(state.contactNumber) ||
                  !validate.checkWebsite(state.website) ||
                  !state.jobTerminationNotice ||
                  !state.category ||
                  !validate.checkName(state.businessDisplayName) ||
                  !validate.checkEmail(state.email) ||
                  !state.netTerms.trim() ||
                  state.federalId.trim().length !== 8 ||
                  !(
                    state.fax.length === 0 ||
                    validate.checkNumber(state.fax)
                  )
                }
                type="submit"
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