import React from "react"
import EditIcon from "@material-ui/icons/Edit"
import { TextField, makeStyles, Button, Drawer, Grid } from "@material-ui/core"
import { FiEdit3 } from "react-icons/fi"
import validate from "../../../../../../../shared/validation"
import { MobileNumberFormatter } from "../../../../../../../shared/customNumberFormats"

const useStyles = makeStyles({
  setDrawer: {
    width: "auto",
  },
})

function Presentation(props) {
  const {
    jobTitle,
    email,
    homePhone,
    services,
    firstName,
    middleName,
    lastName,
    phoneNumber,
    mobileNumber,
    handleChange,
    handleSubmit,
  } = props
  const classes = useStyles()
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
        className={classes.setDrawer}
      >
        <div className="m-3">
          <div className="text-center">
            <FiEdit3 fontSize="50px" />
            <h3>
              <u>Edit Account Details</u>
            </h3>
          </div>
          <div className="mb-3"></div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Services"
                  name="services"
                  value={services}
                  onChange={handleChange}
                  helperText={
                    services.length
                      ? validate.checkName(services)
                        ? ""
                        : "Enter valid service"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  helperText={
                    firstName.length
                      ? validate.checkName(firstName)
                        ? ""
                        : "Enter valid name"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Middle Name"
                  name="middleName"
                  value={middleName}
                  onChange={handleChange}
                  helperText={
                    middleName.length
                      ? validate.checkName(middleName)
                        ? ""
                        : "Enter valid name"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  helperText={
                    lastName.length ? (validate.checkName(lastName) ? "" : "Enter valid name") : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Job Title"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={handleChange}
                  helperText={
                    jobTitle.length
                      ? validate.checkName(jobTitle)
                        ? ""
                        : "Enter valid jobTitle"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  helperText={
                    email.length ? (validate.checkEmail(email) ? "" : "Enter valid email") : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mobile Number"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={handleChange}
                  helperText={
                    mobileNumber.length
                      ? validate.checkNumber(mobileNumber)
                        ? ""
                        : "Enter valid mobile number"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  helperText={
                    phoneNumber.length
                      ? validate.checkNumber(phoneNumber)
                        ? ""
                        : "Enter valid phone number"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Home Phone"
                  name="homePhone"
                  value={homePhone}
                  onChange={handleChange}
                  helperText={
                    homePhone.length
                      ? validate.checkNumber(homePhone)
                        ? ""
                        : "Enter valid home phone"
                      : ""
                  }
                  size="small"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
            </Grid>
            <div className="text-center mt-3">
              <Button variant="contained" color={"secondary"} type="submit">
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
