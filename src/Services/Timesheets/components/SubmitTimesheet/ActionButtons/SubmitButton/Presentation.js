import React from 'react'
import Icon from '@material-ui/core/Icon';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, Typography, DialogContent, Button, DialogActions, IconButton, CircularProgress, FormHelperText } from "@material-ui/core"
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../../styles/dialogStyles"
import validate from "../../../../../../shared/validation"

function Presentation(props) {

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

  const { handleClickOpen, open, handleClose, onSubmit, state, hideBtn, disableBtn } = props
  console.log(disableBtn)
  return (
    <div className="text-center">
      <Button
        variant="contained"
        color="primary"
        size="large"
        hidden={state.type !== "new"}
        disabled={disableBtn}
        onClick={handleClickOpen}
        endIcon={<Icon>send</Icon>}
      >
        Submit

      </Button>
      <div className="d-flex justify-content-between">
        <div />
        {
          state.isAlreadySubmitted ?
            <FormHelperText>Already submitted</FormHelperText>
            :
            null
        }
        <div />
      </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You want to submit the timesheet of range <span className="custom-chip chip-success" >{`${validate.dateFormatter(state.timesheetInfo.startDate)} - ${validate.dateFormatter(state.timesheetInfo.endDate)}`}</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
