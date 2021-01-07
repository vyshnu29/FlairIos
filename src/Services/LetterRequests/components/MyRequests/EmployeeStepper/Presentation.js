import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import validate from "../../../../../shared/validation"
import RequestLetters from "../RequestLetters"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import parser from "html-react-parser"
import Divider from "@material-ui/core/Divider"
import MetaInfo from "../../../../../shared/getMetaInfo"
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    marginBottom: "0",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  row: {
    marginTop: "20px",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
}))

const steps = ["Select letter", "Check details", "Review"]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Presentation(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [req_doc, setReqDoc] = React.useState("")
  const [isLetterDetailsVerified, setLetterDetailsVerified] = React.useState(
    false
  )
  const [fillField, selectField] = React.useState("")
  const { handleRequest } = props
  // const [state] = useContext(DataContext)
  const metaInfo = new MetaInfo()
  const employee = props.employee
  console.log(employee, employee.personal)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setActiveStep(0)
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  let employeeReqFields = []
  if (Object.keys(employee).length)
    employeeReqFields = [
      {
        field: "University address",
        isFilled:
          employee.hasOwnProperty("educationhistory") &&
          fillField !== "" &&
          employee.educationhistory.length &&
          employee.educationhistory.filter(
            (item) => item.schoolname === fillField
          )[0].address.length
            ? true
            : false,
        value:
          employee.hasOwnProperty("educationhistory") &&
          fillField !== "" &&
          employee.educationhistory.length &&
          employee.educationhistory.filter(
            (item) => item.schoolname === fillField
          )[0].address.length
            ? employee.educationhistory.filter(
                (item) => item.schoolname === fillField
              )[0].address
            : "",
      },
      {
        field: "Reporting manager/Supervisor",
        isFilled:
          employee.personal.hasOwnProperty("reportingmanager") &&
          employee.personal.reportingmanager.length
            ? true
            : false,
        value: employee.personal.hasOwnProperty("reportingmanager")
          ? metaInfo.emailToName(employee.personal.reportingmanager)
          : "",
      },
      {
        field: "Employee full name",
        isFilled:
          employee.personal.firstname.length &&
          employee.personal.lastname.length
            ? true
            : false,
        value: [
          employee.personal.firstname,
          employee.personal.middlename,
          employee.personal.lastname,
        ].join(" "),
      },
      {
        field: "Employee job title",
        isFilled:
          employee.personal.hasOwnProperty("jobtitle") &&
          employee.personal.jobtitle.length
            ? true
            : false,
        value: employee.personal.hasOwnProperty("jobtitle")
          ? employee.personal.jobtitle
          : "",
      },
      {
        field: "Salary",
        isFilled: true,
        value: "1300$",
      },
    ]

  const EmployeeSelectFields = () => {
    return (
      <div>
        <h4>
          The below details are going to displayed on your approved letter, so
          please check the details thoroughly
        </h4>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Select university"
              required
              value={fillField}
              style={{ width: "250px" }}
              onChange={(e) => selectField(e.target.value)}
              name="type"
            >
              <MenuItem value="">None</MenuItem>
              {Object.keys(employee).length &&
                employee.educationhistory.length &&
                employee.educationhistory.map((item) => {
                  return (
                    <MenuItem value={item.schoolname}>
                      {item.schoolname}{" "}
                    </MenuItem>
                  )
                })}
            </TextField>
          </Grid>
          {employeeReqFields.length &&
            employeeReqFields.map((item) => {
              return (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={item.field}
                    required
                    variant="outlined"
                    fullWidth
                    size="small"
                    helperText={
                      fillField ? 
                     ( !item.isFilled
                        ? "Incorrect " + item.field.toLowerCase()
                        : "" ): ""
                    }
                    readOnly
                    value={item.value}
                  ></TextField>
                </Grid>
              )
            })}
        </Grid>
        <br />
        {/* <h2 style={{textDecoration : 'underline'}} >Company details:</h2>
        <Grid container spacing={3}>
            {
              companyReqFields.length && companyReqFields.map(item => {
                return(
                  <Grid item xs={12} sm={6} >
                    <TextField
                        label={item.field}
                        required
                        variant='outlined'
                        fullWidth
                        size='small'
                        helperText={!item.isFilled ? 'Incorrect '+ item.field.toLowerCase() : '' }
                        readOnly
                        value={item.value}
                    >
                    </TextField>
                  </Grid>
                )
                
              })
            }
        </Grid><br/> */}
      </div>
    )
  }

  const ReviewForm = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Review
        </Typography>
        <br />
        <Divider />
        <List disablePadding>
          {employeeReqFields.map((item, index) => (
            <div>
              <ListItem className={classes.listItem} key={index}>
                <ListItemText primary={item.field} />
                <Typography variant="body2">{item.value}</Typography>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Letter requested" />
            <Typography variant="body2">{type} </Typography>
          </ListItem>
          <Divider />
        </List>
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Description" />
            <Typography variant="body2">{parser(description)} </Typography>
          </ListItem>
          <Divider />
        </List>
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Document" />
            <Typography variant="body2">
              {req_doc !== "" ? (
                <a target="_blank" rel="noopener noreferrer" href={req_doc}>
                  Link to doc
                </a>
              ) : (
                ""
              )}{" "}
            </Typography>
          </ListItem>
          <Divider />
        </List>
      </React.Fragment>
    )
  }

  console.log(type, description, req_doc)

  const requestDetailsVerified = (bool, { type, description, req_doc }) => {
    setLetterDetailsVerified(bool)
    setType(type)
    setDescription(description)
    setReqDoc(req_doc)
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RequestLetters
            requestDetailsVerified={(res, data) =>
              requestDetailsVerified(res, data)
            }
          />
        )
      case 1:
        return <EmployeeSelectFields />
      case 2:
        return <ReviewForm />
      default:
        return (
          <RequestLetters
            requestDetailsVerified={(res, data) =>
              requestDetailsVerified(res, data)
            }
          />
        )
    }
  }

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Letter request
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              <div className={classes.content}>
                {getStepContent(activeStep)}
              </div>
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                {
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={!isLetterDetailsVerified ? true : false}
                    hidden={activeStep !== 0 ? true : false}
                  >
                    Next
                  </Button>
                }
                {
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={
                      !employeeReqFields.every((item) => item.isFilled === true)
                    }
                    hidden={activeStep !== 1 ? true : false}
                  >
                    Next
                  </Button>
                }
                {
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClose()
                      handleRequest(
                        type,
                        description,
                        req_doc,
                        employee.educationhistory.filter(
                          (item) => item.schoolname === fillField
                        )[0]
                      )
                    }}
                    className={classes.button}
                    hidden={activeStep !== 2 ? true : false}
                  >
                    Request
                  </Button>
                }
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </div>
  )
}
