import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import HighlightOff from "@material-ui/icons/HighlightOff"
import SunEditor from "suneditor-react"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Presentation(props) {
  const classes = useStyles()
  const { handleChange, handleReject, description,loggedInEmployee,id } = props
console.log(id,loggedInEmployee)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {
        (!(loggedInEmployee === id)) ? 
        <IconButton onClick={handleClickOpen} color="secondary">
          <HighlightOff />
          </IconButton>
          : null
      }
      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Reason
            </Typography>
            <Grid item xs={12} sm={12}>
              <p>Description*:</p>
              <SunEditor
                placeholder="Description"
                setContents={description}
                onChange={(data) => handleChange("description", data)}
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
            </Grid>
            {description !== "" ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(false)
                  handleReject()
                }}
                className={classes.submit}
              >
                Reject
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
                Reject
              </Button>
            )}
          </Paper>
        </main>
      </Dialog>
    </div>
  )
}
