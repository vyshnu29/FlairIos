import React from "react"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  MenuItem,
} from "@material-ui/core"
import { AddCircleOutline as AddCircleOutlineIcon } from "@material-ui/icons"
import { NumberFormatCustom } from "../../../../../../shared/customNumberFormats"

function Presentation(props) {
  const {
    open,
    handleClickOpen,
    handleClose,
    handleChange,
    name,
    type,
    value,
    handleAdd,
    index,
  } = props
  return (
    <div>
      <div>
        <IconButton onClick={handleClickOpen}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Discount</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                size="small"
                fullWidth
                required
                value={name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Type"
                size="small"
                style={{ minWidth: "100%" }}
                required
                value={type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
              >
                <MenuItem value="byValue">By Value</MenuItem>
                <MenuItem value="byPercentage">By Percentage</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Value"
                size="small"
                fullWidth
                required
                value={value}
                onChange={(e) => {
                  if (!isNaN(e.target.value))
                    handleChange(index, "value", Number(e.target.value).toFixed(2))
                }}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!name || !value || !type}
            onClick={handleAdd}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Presentation

/*
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
*/
