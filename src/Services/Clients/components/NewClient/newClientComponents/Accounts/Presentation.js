import React from "react"
import {
  Grid,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Tooltip,
  IconButton,
  // Button,
} from "@material-ui/core"
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from "@material-ui/icons"
import validate from "../../../../../../shared/validation"
import ChipInput from "material-ui-chip-input"
import {
  MobileNumberFormatter,
  NumberFormatCustom,
} from "../../../../../../shared/customNumberFormats"

function Presentation(props) {
  const {
    accounts,
    handleChange,
    handleAdd,
    handleDiscountDetails,
    handleDelete,
    onAddDiscount,
    onRemoveDiscount,
  } = props
  return (
    <div className="custom-card">
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              label="Services"
              name="services"
              value={accounts.services}
              onChange={handleChange}
              helperText={
                accounts.services.length
                  ? validate.checkName(accounts.services)
                    ? ""
                    : "Enter valid service"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="First Name"
              name="firstName"
              value={accounts.firstName}
              onChange={handleChange}
              helperText={
                accounts.firstName.length
                  ? validate.checkName(accounts.firstName)
                    ? ""
                    : "Enter valid name"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Middle Name"
              name="middleName"
              value={accounts.middleName}
              onChange={handleChange}
              helperText={
                accounts.middleName.length
                  ? validate.checkName(accounts.middleName)
                    ? ""
                    : "Enter valid name"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Last Name"
              name="lastName"
              value={accounts.lastName}
              onChange={handleChange}
              helperText={
                accounts.lastName.length
                  ? validate.checkName(accounts.lastName)
                    ? ""
                    : "Enter valid name"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Job Title"
              name="jobTitle"
              value={accounts.jobTitle}
              onChange={handleChange}
              helperText={
                accounts.jobTitle.length
                  ? validate.checkName(accounts.jobTitle)
                    ? ""
                    : "Enter valid jobTitle"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Email"
              name="email"
              value={accounts.email}
              onChange={handleChange}
              helperText={
                accounts.email.length
                  ? validate.checkEmail(accounts.email)
                    ? ""
                    : "Enter valid email"
                  : ""
              }
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={accounts.mobileNumber}
              onChange={handleChange}
              helperText={
                accounts.mobileNumber.length
                  ? validate.checkNumber(accounts.mobileNumber)
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
          <Grid item xs={3}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={accounts.phoneNumber}
              onChange={handleChange}
              helperText={
                accounts.phoneNumber.length
                  ? validate.checkNumber(accounts.phoneNumber)
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
          <Grid item xs={3}>
            <TextField
              label="Home Phone"
              name="homePhone"
              value={accounts.homePhone}
              onChange={handleChange}
              helperText={
                accounts.homePhone.length
                  ? validate.checkNumber(accounts.homePhone)
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
        <br />
        <Typography variant="h5">Notifiers</Typography>
        <Divider />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <ChipInput
              value={accounts.to}
              onAdd={(chip) => handleAdd("to", chip)}
              onDelete={(_, index) => handleDelete("to", index)}
              helperText={accounts.helperText.to}
              allowDuplicates={false}
              label="To"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <ChipInput
              value={accounts.cc}
              onAdd={(chip) => handleAdd("cc", chip)}
              onDelete={(_, index) => handleDelete("cc", index)}
              helperText={accounts.helperText.cc}
              allowDuplicates={false}
              label="CC"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <ChipInput
              value={accounts.bcc}
              onAdd={(chip) => handleAdd("bcc", chip)}
              onDelete={(_, index) => handleDelete("bcc", index)}
              helperText={accounts.helperText.bcc}
              allowDuplicates={false}
              label="BCC"
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Typography variant="h5">Discounts</Typography>
        <Divider />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              select
              label="Status"
              size="small"
              style={{ minWidth: "100%" }}
              fullWidth
              onChange={handleChange}
              name="status"
              variant="outlined"
              value={accounts.status}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="InActive">InActive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {accounts.discountDetails.map((item, index) => {
              return (
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      variant="outlined"
                      value={item["name"]}
                      name="name"
                      onChange={(e) => handleDiscountDetails(e, index)}
                      label="Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      style={{ minWidth: "100%" }}
                      size="small"
                      label="Select"
                      variant="outlined"
                      value={item["type"]}
                      onChange={(e) => handleDiscountDetails(e, index)}
                      select
                      name="type"
                    >
                      <MenuItem value="byValue">By Value</MenuItem>
                      <MenuItem value="byPercentage">By Percentage</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      type="text"
                      variant="outlined"
                      value={item["value"]}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        if (
                          (accounts.discountDetails[index]["type"] === "byPercentage" &&
                            val < 100) ||
                          accounts.discountDetails[index]["type"] === "byValue"
                        ) {
                          accounts.discountDetails[index]["value"] = val
                          handleDiscountDetails(e, index)
                        }
                      }}
                      label="Discount"
                      name="value"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <div className="d-flex">
                      {accounts.discountDetails.length > 1 ? (
                        <div>
                          <Tooltip title="Remove this discount">
                            <IconButton onClick={() => onRemoveDiscount(index)}>
                              <RemoveCircleOutlineIcon className="text-danger" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ) : null}
                      {index === accounts.discountDetails.length - 1 ? (
                        <div className="mr-1">
                          <Tooltip title="Add multiple discounts">
                            <IconButton onClick={onAddDiscount}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default Presentation
