import React from "react"
import { Grid, TextField, Divider, Typography, MenuItem } from "@material-ui/core"
import {
  NumberFormatCustom,
  FederalIdPattern,
  DoubleDigitFormatter,
  MobileNumberFormatter,
} from "../../../../../../shared/customNumberFormats"
import CountryAndState from "../../../../../../shared/countryAndState"
import validate from "../../../../../../shared/validation"
import { GoFileSymlinkFile } from "react-icons/go"

function Presentation(props) {
  const { businessInformation, handleChange, handleKeyValuePair, isUploading, handleFile } = props
  const jobTerminationNoticeList = ["1-week", "2-weeks", "3-weeks", "4-weeks"]
  const categoryList = ["End Client", "Prime-Contractor", "Sub-Contractor"]

  return (
    <div className="custom-card">
      <form>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Business Name"
              helperText={
                businessInformation.businessName.length
                  ? validate.checkName(businessInformation.businessName)
                    ? ""
                    : "Enter valid Business name"
                  : ""
              }
              name="businessName"
              id="new-client-businessName"
              value={businessInformation.businessName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Business Display Name"
              name="businessDisplayName"
              id="new-client-businessDisplayName"
              helperText={
                businessInformation.businessDisplayName.length
                  ? validate.checkName(businessInformation.businessDisplayName)
                    ? ""
                    : "Enter valid Business display name"
                  : ""
              }
              value={businessInformation.businessDisplayName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Email"
              name="email"
              value={businessInformation.email}
              id="new-client-email"
              helperText={
                businessInformation.email.length
                  ? validate.checkEmail(businessInformation.email)
                    ? ""
                    : "Enter valid email id"
                  : ""
              }
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Contact Number"
              name="contactNumber"
              id="new-client-contactNumber"
              helperText={
                businessInformation.contactNumber.length
                  ? validate.checkNumber(businessInformation.contactNumber)
                    ? ""
                    : "Enter valid contact number"
                  : ""
              }
              value={businessInformation.contactNumber}
              onChange={handleChange}
              InputProps={{
                inputComponent: MobileNumberFormatter,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Federal ID"
              placeholder="##-######"
              name="federalId"
              value={businessInformation.federalId}
              id="new-client-federalId"
              helperText={
                businessInformation.federalId.length
                  ? businessInformation.federalId.trim().length === 8
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

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Website"
              name="website"
              value={businessInformation.website}
              id="new-client-website"
              helperText={
                businessInformation.website.length
                  ? validate.checkWebsite(businessInformation.website)
                    ? ""
                    : "Enter valid website"
                  : ""
              }
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Net Terms"
              name="netTerms"
              id="new-client-netTerms"
              value={businessInformation.netTerms}
              onChange={handleChange}
              InputProps={{
                inputComponent: DoubleDigitFormatter,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Job Termination Notice"
              name="jobTerminationNotice"
              id="new-client-jobTerminationNotice"
              value={businessInformation.jobTerminationNotice}
              onChange={handleChange}
            >
              <MenuItem value={""}>None</MenuItem>
              {jobTerminationNoticeList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              variant="outlined"
              size="small"
              required
              fullWidth
              label="Client Category"
              name="category"
              value={businessInformation.category}
              onChange={handleChange}
              id="new-client-category"
            >
              <MenuItem value="">None</MenuItem>
              {categoryList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Fax"
              name="fax"
              value={businessInformation.fax}
              id="new-client-fax"
              helperText={
                businessInformation.fax.length
                  ? validate.checkNumber(businessInformation.fax)
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
          <Grid item xs={4}>
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
              {businessInformation.logo !== "" ? (
                <a target="_blank" rel="noopener noreferrer" href={businessInformation.logo}>
                  <GoFileSymlinkFile size={22} />
                </a>
              ) : (
                <p>No file choosen</p>
              )}{" "}
            </p>
            {isUploading ? <p>Uploading please wait...</p> : ""}
          </Grid>
        </Grid>
        <br />
        <Typography variant="h6" className="mt-2">
          Invoice Location
        </Typography>
        <Divider />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              label="Address Line 1"
              name="invoiceLocation-line1"
              id="new-client-invoiceLocation-line1"
              value={businessInformation.invoiceLocation.line1}
              helperText={
                businessInformation.invoiceLocation.line1.length
                  ? validate.checkAddress(businessInformation.invoiceLocation.line1)
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
          <Grid item xs={4}>
            <TextField
              label="Address Line 2"
              name="invoiceLocation-line2"
              id="new-client-invoiceLocation-line2"
              value={businessInformation.invoiceLocation.line2}
              helperText={
                businessInformation.invoiceLocation.line2.length
                  ? validate.checkAddress(businessInformation.invoiceLocation.line2)
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
              name="invoiceLocation-city"
              id="new-client-invoiceLocation-city"
              value={businessInformation.invoiceLocation.city}
              helperText={
                businessInformation.invoiceLocation.city.length
                  ? validate.checkAddress(businessInformation.invoiceLocation.city)
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
              countries={businessInformation.countries}
              states={businessInformation.states}
              state={businessInformation.invoiceLocation.state}
              country={businessInformation.invoiceLocation.country}
              spacing={1}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip code"
              name="invoiceLocation-zipCode"
              value={businessInformation.invoiceLocation.zipCode}
              variant="outlined"
              size="small"
              id="new-client-invoiceLocation"
              required
              helperText={
                businessInformation.invoiceLocation.zipCode.length
                  ? validate.checkZip(businessInformation.invoiceLocation.zipCode)
                    ? ""
                    : "Enter valid zip code"
                  : ""
              }
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default Presentation
