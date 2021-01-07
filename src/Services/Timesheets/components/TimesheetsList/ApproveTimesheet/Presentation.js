import React from 'react'
import { IconButton, Dialog, Typography, DialogContent, Button, DialogActions } from "@material-ui/core"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../styles/dialogStyles"
import MetaInfo from "../../../../../shared/getMetaInfo";

function Presentation(props) {
  const { open, handleClickOpen, handleClose, onApprove, employeeID, hideBtn } = props
  const metaInfo = new MetaInfo();

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

  return (
    <div>
      <IconButton hidden={hideBtn} variant="outlined" color="primary" onClick={handleClickOpen}>
        <CheckCircleOutline />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You are going to approve the timesheet of <span className="custom-chip chip-success" >{metaInfo.emailToName(employeeID)}</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onApprove} variant="contained" color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
