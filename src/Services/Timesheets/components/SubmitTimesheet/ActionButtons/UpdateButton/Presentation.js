import React from 'react'
import Icon from '@material-ui/core/Icon';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, Typography, DialogContent, Button, DialogActions, IconButton } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../../styles/dialogStyles"
import validate from "../../../../../../shared/validation"

function Presentation(props) {
  const { handleClickOpen, open, handleClose, onUpdate, state, disableBtn } = props

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
    <div className="text-center">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        hidden={state.type === "new"}
        disabled={disableBtn}
        onClick={handleClickOpen}
        endIcon={<Icon>send</Icon>}
      >
        Update
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You want to update the timesheet of range <span className="custom-chip chip-success" >{`${validate.dateFormatter(state.timesheetInfo.startDate)} - ${validate.dateFormatter(state.timesheetInfo.endDate)}`}</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onUpdate} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
