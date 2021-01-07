import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from "@material-ui/core"
import { MdNotifications } from "react-icons/md"
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../styles/dialogStyles";
import CloseIcon from '@material-ui/icons/Close';

function Presentation(props) {
  const { state, handleClickOpen, handleClose, onNotify, setState } = props

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
      <IconButton hidden={state.hideBtn} onClick={handleClickOpen} className="text-info" >
        <MdNotifications size={23} />
      </IconButton>
      <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle onClose={handleClose} id="form-dialog-title">Notify</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notify {state.name} about pending defaulter timesheet.
          </DialogContentText>
          <div className="row" >
            <div className="col-12 " >
              <TextField
                margin="dense"
                id="notifydefaulter-name"
                label="Email Address"
                value={state.email}
                type="email"
                fullWidth
              />
            </div>
            <div className="col-12 mt-3" >
              <TextField
                id="notifydefaulter-subject"
                label="Subject"
                value={state.subject}
                onChange={(e) => setState({ subject: e.target.value })}
                type="text"
                name="subject"
                fullWidth
              />
            </div>
            <div className="col-12 mt-3" >
              <TextField
                margin="dense"
                id="notifydefaulter-body"
                label="body"
                value={state.body}
                onChange={(e) => setState({ body: e.target.value })}
                type="text"
                name="body"
                fullWidth
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onNotify} color="primary">
            Notify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
