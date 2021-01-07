import React from 'react'
import { IconButton, Dialog, Typography, DialogContent, Button, DialogActions } from "@material-ui/core"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../../styles/dialogStyles"
import HighlightOff from "@material-ui/icons/HighlightOff"
import SunEditor from "suneditor-react"
import MetaInfo from "../../../../../shared/getMetaInfo";

function Presentation(props) {
  const { state, setState, handleClickOpen, handleClose, onReject, employeeID } = props
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
      <IconButton hidden={state.hideBtn} variant="outlined" color="secondary" onClick={handleClickOpen}>
        <HighlightOff />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Are you sure?
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You are going to reject the timesheet of <span className="custom-chip chip-danger" >{metaInfo.emailToName(employeeID)}</span>
          </Typography>
          <div>
            <SunEditor
              placeholder={"Description *"}
              value={state.description}
              width="90%"
              onChange={(data) => setState({ description: data })}
              setOptions={{
                buttonList: [
                  [
                    "undo",
                    "redo",
                    "formatBlock",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                    "fontColor",
                    "hiliteColor",
                    "removeFormat",
                    "outdent",
                    "indent",
                    "align",
                    "horizontalRule",
                    "list",
                    "lineHeight",
                    "table",
                    "link",
                  ],
                ],
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={!state.description.length} onClick={onReject} variant="contained" color="secondary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation
