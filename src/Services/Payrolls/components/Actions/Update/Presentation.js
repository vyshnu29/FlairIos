import React from 'react'
import { IconButton, Dialog, Typography, DialogContent, Button, DialogActions } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../../../styles/dialogStyles"
import MetaInfo from "../../../../../shared/getMetaInfo"

function Presentation(props) {
  const { handleClickOpen, open, handleClose, onUpdate, employeeID, state } = props
  const metaObj = new MetaInfo()
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const isUpdating = state.actions.updatingPayroll.includes(employeeID)
  const isGenerating = state.actions.generatingPayroll.includes(employeeID)
  return (
    <div>
      <Button disabled={isUpdating || isGenerating} variant="contained" color="secondary" onClick={handleClickOpen}>
        {isUpdating ? "Updating" : "Update"}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You are going to update the payroll settings of <span className="custom-chip chip-danger" >{metaObj.getEmployeeKey(employeeID, "name")}</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onUpdate} variant="contained" color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
