import React from "react"
import { Grid, TextField, MenuItem, Button } from "@material-ui/core"
import validate from "../../../../../../../shared/validation"
import CountryAndState from "../../../../../../../shared/countryAndState"
import {
  MobileNumberFormatter,
  NumberFormatCustom,
} from "../../../../../../../shared/customNumberFormats"

function Presentation(props) {
  const { contact, handleChange, onSubmit, handleKeyValuePair } = props
  const genderList = ["Female", "Male", "Others"]
  return (
    <div className="custom-card">
      <form onSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              label="Representative Name"
              name="representativeName"
              value={contact.representativeName}
              onChange={handleChange}
              helperText={
                contact.representativeName.length
                  ? validate.checkName(contact.representativeName)
                    ? ""
                    : "Enter valid representative name"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={contact.jobTitle}
              onChange={handleChange}
              helperText={
                contact.jobTitle.length
                  ? validate.checkName(contact.jobTitle)
                    ? ""
                    : "Enter valid job title"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Gender"
              name="gender"
              value={contact.gender}
              onChange={handleChange}
              size="small"
              required
              fullWidth
              variant="outlined"
            >
              {genderList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              helperText={
                contact.email.length
                  ? validate.checkEmail(contact.email)
                    ? ""
                    : "Enter valid email"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Mobile"
              name="mobile"
              value={contact.mobile}
              onChange={handleChange}
              helperText={
                contact.mobile.length
                  ? validate.checkNumber(contact.mobile)
                    ? ""
                    : "Enter valid phone number"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
              InputProps={{
                inputComponent: MobileNumberFormatter,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  label="Work Phone"
                  name="workPhone"
                  value={contact.workPhone}
                  onChange={handleChange}
                  helperText={
                    contact.workPhone.length
                      ? validate.checkNumber(contact.workPhone)
                        ? ""
                        : "Enter valid work phone"
                      : ""
                  }
                  size="small"
                  required
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    inputComponent: MobileNumberFormatter,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Ext."
                  name="workPhoneExtension"
                  value={contact.workPhoneExtension}
                  onChange={handleChange}
                  // helperText={
                  // 	workPhoneExtension.length
                  // 		? validate.checkNumber(workPhoneExtension)
                  // 			? ''
                  // 			: 'Enter valid work phone'
                  // 		: ''
                  // }
                  size="small"
                  required
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Home Phone"
              name="homePhone"
              value={contact.homePhone}
              onChange={handleChange}
              helperText={
                contact.homePhone.length
                  ? validate.checkNumber(contact.homePhone)
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
          <Grid item xs={3}>
            <TextField
              label="Address Line 1"
              name="line1"
              value={contact.line1}
              onChange={handleChange}
              helperText={
                contact.line1.length
                  ? validate.checkAddress(contact.line1)
                    ? ""
                    : "Enter valid address"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Address Line 2"
              name="line2"
              value={contact.line2}
              onChange={handleChange}
              helperText={
                contact.line2.length
                  ? validate.checkAddress(contact.line2)
                    ? ""
                    : "Enter valid address"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="City"
              name="city"
              value={contact.city}
              onChange={handleChange}
              size="small"
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <CountryAndState
              handleKeyValuePair={handleKeyValuePair}
              countries={contact.countries}
              states={contact.states}
              state={contact.state_name}
              country={contact.country}
              spacing={1}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Zip Code"
              name="zip"
              value={contact.zip}
              onChange={handleChange}
              helperText={
                contact.zip.length
                  ? validate.checkZip(contact.zip)
                    ? ""
                    : "Enter valid zip code"
                  : ""
              }
              size="small"
              required
              fullWidth
              variant="outlined"
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
              !validate.checkName(contact.representativeName) ||
              !contact.gender.trim() ||
              !validate.checkName(contact.jobTitle) ||
              !validate.checkEmail(contact.email) ||
              !validate.checkNumber(contact.mobile) ||
              !validate.checkNumber(contact.workPhone) ||
              !validate.checkAddress(contact.line1) ||
              !validate.checkZip(contact.zip) ||
              !contact.city.trim() ||
              !contact.workPhoneExtension.trim() ||
              !contact.state_name ||
              !contact.country ||
              !(contact.homePhone.length === 0 || validate.checkNumber(contact.homePhone))
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
