import React from "react"
import VisibilityIcon from "@material-ui/icons/Visibility"
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  CircularProgress,
} from "@material-ui/core"
import HTMLReactParser from "html-react-parser"
import { FaFilePdf } from "react-icons/fa"

function Presentation(props) {
  const { printInvoice, invoicePreview, getHTML } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    getHTML()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onPressDownload = () => {
    printInvoice()
    handleClose()
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <VisibilityIcon style={{ color: "chocolate" }} />
      </IconButton>
      <Dialog scroll="paper" maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent dividers={true}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            {invoicePreview.isLoaded ? HTMLReactParser(invoicePreview.html) : <CircularProgress />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="inherit">
            Close
          </Button>
          <Button onClick={onPressDownload} variant="contained" color="secondary">
            <span>
              <FaFilePdf size={18} /> Download
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
