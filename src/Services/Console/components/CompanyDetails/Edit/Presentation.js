import React, { useState } from "react"
import {
  Dialog,
  AppBar,
  IconButton,
  Typography,
  Paper,
  Slide,
  Fab,
  Grid,
  TextField,
  FormControlLabel,
  Button,
} from "@material-ui/core"
import { Close as CloseIcon, Edit as EditIcon } from "@material-ui/icons"
import useStyles from "../../../../../shared/styles/dialogStyles"
import IosSwitch from "../../../../../shared/iosSwitch"
import { GoFileSymlinkFile } from "react-icons/go"

function Presentation(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    companyDetails,
    handleChange,
    handleSubmit,
    handleKeyValuePair,
    handleFile,
    isUploading,
  } = props
  return (
    <div>
      <div className="text-right">
        <Fab size="medium" color="primary" onClick={handleOpen}>
          <EditIcon />
        </Fab>
      </div>
      <Dialog
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        //TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <div className="d-flex justify-content-between p-2">
            <div>
              <IconButton
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <Typography component="h1" variant="h4" align="center">
                Edit Company Details
              </Typography>
            </div>
            <div></div>
          </div>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Typography variant="h6" gutterBottom></Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Company Name"
                      name="companyName"
                      id="console-company-details-companyName"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.companyName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Web URL"
                      name="web_url"
                      id="console-company-details-web_url"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.web_url}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="EIN-Number"
                      name="ein_Number"
                      id="console-company-details-ein_Number"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.ein_Number}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="E-Verify Number"
                      id="console-company-details-e_VerifyNumber"
                      name="e_VerifyNumber"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.e_VerifyNumber}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Mail Id"
                      name="contactDetails-mailId"
                      id="console-company-details-contactDetails-mailId"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.contactDetails.mailId}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="HR Mail Id"
                      name="contactDetails-hrMailId"
                      id="console-company-details-contactDetails-hrMailId"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.contactDetails.hrMailId}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Accounts Mail Id"
                      name="contactDetails-accountsMailId"
                      id="console-company-details-"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.contactDetails.accountsMailId}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone No"
                      name="contactDetails-phoneno"
                      id="console-company-details-contactDetails-phoneno"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.contactDetails.phoneno}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Invoice Begin From"
                      name="beginFrom"
                      id="console-company-details-invoiceDetails-begin-from"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        const { name, value } = e.target
                        const invoiceNumberFormat = {
                          ...companyDetails.invoiceDetails.invoiceNumberFormat,
                          [name]: value,
                        }
                        handleKeyValuePair(
                          "invoiceDetails-invoiceNumberFormat",
                          invoiceNumberFormat
                        )
                      }}
                      required
                      fullWidth
                      value={
                        companyDetails.invoiceDetails.invoiceNumberFormat
                          .beginFrom
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Invoice Prefix"
                      name="invoicePrefix"
                      id="console-company-details-invoiceDetails-invoice-prefix"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        const { name, value } = e.target
                        const invoiceNumberFormat = {
                          ...companyDetails.invoiceDetails.invoiceNumberFormat,
                          [name]: value,
                        }
                        handleKeyValuePair(
                          "invoiceDetails-invoiceNumberFormat",
                          invoiceNumberFormat
                        )
                      }}
                      required
                      fullWidth
                      value={
                        companyDetails.invoiceDetails.invoiceNumberFormat
                          .invoicePrefix
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Invoice Seperator"
                      name="seperator"
                      id="console-company-details-invoiceDetails-seperator"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        const { name, value } = e.target
                        const invoiceNumberFormat = {
                          ...companyDetails.invoiceDetails.invoiceNumberFormat,
                          [name]: value,
                        }
                        handleKeyValuePair(
                          "invoiceDetails-invoiceNumberFormat",
                          invoiceNumberFormat
                        )
                      }}
                      required
                      fullWidth
                      value={
                        companyDetails.invoiceDetails.invoiceNumberFormat
                          .seperator
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<IosSwitch />}
                          label="Auto Generate"
                          name="invoiceDetails-invoiceAutoGenerate"
                          checked={
                            companyDetails.invoiceDetails.invoiceAutoGenerate
                          }
                          id="console-company-details-invoiceDetails-invoiceAutoGenerate-invoiceAutoGenerate"
                          onChange={(e) => {
                            const { name, checked } = e.target
                            handleKeyValuePair(name, checked)
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<IosSwitch />}
                          label="Auto Send"
                          name="invoiceDetails-invoiceAutoSend"
                          checked={
                            companyDetails.invoiceDetails.invoiceAutoSend
                          }
                          id="console-company-details-invoiceDetails-invoiceAutoSend"
                          onChange={(e) => {
                            const { name, checked } = e.target
                            handleKeyValuePair(name, checked)
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Address"
                      name="contactDetails-address"
                      rows={4}
                      multiline
                      id="console-company-details-contactDetails-address"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.contactDetails.address}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Payable To"
                      name="invoiceDetails-payableTo"
                      rows={4}
                      multiline
                      id="console-company-details-invoiceDetails-payableTo"
                      variant="outlined"
                      size="small"
                      onChange={handleChange}
                      required
                      fullWidth
                      value={companyDetails.invoiceDetails.payableTo}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Logo"
                      type="file"
                      name="images-companyLogo"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => handleFile(e, e.target.name)}
                    />
                    <p>
                      {companyDetails.images.companyLogo !== "" ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={companyDetails.images.companyLogo}
                        >
                          <GoFileSymlinkFile size={22} />
                        </a>
                      ) : (
                        <p>No file choosen</p>
                      )}{" "}
                    </p>
                    {isUploading ? <p>Uploading please wait...</p> : ""}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Water Mark"
                      type="file"
                      name="images-waterMark"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => handleFile(e, e.target.name)}
                    />
                    <p>
                      {companyDetails.images.waterMark !== "" ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={companyDetails.images.waterMark}
                        >
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
                <div className="text-center">
                  <Button type="submit" color="secondary" variant="contained">
                    Update
                  </Button>
                </div>
              </form>
            </React.Fragment>
          </Paper>
        </main>
      </Dialog>
    </div>
  )
}

export default Presentation
