import React from 'react'
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Dialog, Typography, DialogContent, Button, DialogActions, IconButton, CircularProgress, FormHelperText } from "@material-ui/core"
import styles from "../../../../styles/dialogStyles"
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

function Presentation(props) {
  const { isMailedToClient, id, isVoid, isPaymentDone } = props.row
  const { handleClickOpen, open, handleClose, handleYes, state, isVoiding } = props

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
      {
        isVoiding ?
          <CircularProgress style={{ marginTop: "12px", marginLeft: "11px" }} size={18} />
          :
          (
            <IconButton onClick={handleClickOpen} hidden={isMailedToClient || isVoid || isPaymentDone} >
              <BackspaceIcon style={{ color: "tomato" }} />
            </IconButton>
          )
      }

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You want to make this invoice <span className="custom-chip chip-danger" >{`${id}`}</span> as void
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} hidden={isMailedToClient} disabled={isVoiding} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
