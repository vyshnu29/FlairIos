import React from "react"
import { IconButton, AppBar, Dialog, Typography } from "@material-ui/core"
import { Close as CloseIcon, History as VisibilityIcon } from "@material-ui/icons"
import validate from "../../../../../../shared/validation"
import CustomTable from "../../../../../../shared/customTable"
import useStyles from "../../../../../../shared/styles/dialogStyles"

function Presentation(props) {
  const { history, isLoaded, onClickHistory, totalAmount } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  let columns = [
    { title: "Payment On", field: "paymentDate" },
    { title: "Received Amount", field: "receivedAmount" },
    { title: "Discount Name", field: "name" },
    { title: "Discount Type", field: "type" },
    { title: "Discount Value", field: "value" },
  ]
  let data = []
  isLoaded &&
    history &&
    history.forEach((doc) => {
      const { paymentDate, receivedAmount, discountDetails } = doc
      let discountedValue = 0
      if (discountDetails.type === "byPercentage")
        discountedValue = Number((totalAmount * discountDetails.value) / 100).toFixed(2)
      else discountedValue = discountDetails.value
      data.push({
        paymentDate: validate.dateAndTimeFormatter(paymentDate),
        receivedAmount: validate.currencyFormatterUs(receivedAmount),
        name: discountDetails.name ? discountDetails.name : "--",
        value:
          discountDetails.type === "byValue"
            ? validate.currencyFormatterUs(discountedValue)
            : discountDetails.type === "byPercentage"
            ? `${validate.currencyFormatterUs(discountedValue)}(${discountDetails.value})`
            : "--",
        type: discountDetails.type ? validate.nameFormatterToUpperCase(discountDetails.type) : "--",
      })
    })
  return (
    <div>
      <IconButton
        onClick={(e) => {
          e.preventDefault()
          handleClickOpen()
          onClickHistory()
        }}
      >
        <VisibilityIcon />
      </IconButton>
      <Dialog disableEscapeKeyDown disableBackdropClick open={open} fullWidth maxWidth="lg">
        <AppBar className={classes.appBar}>
          <div className="d-flex justify-content-between p-2">
            <div>
              <IconButton color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <Typography component="h1" variant="h4" align="center">
                Payment History
              </Typography>
            </div>
            <div></div>
          </div>
        </AppBar>
        <main className={classes.layout}>
          <div>
            <CustomTable data={data} columns={columns} isLoading={!isLoaded} isToolBar={false} />
          </div>
        </main>
      </Dialog>
    </div>
  )
}

export default Presentation
