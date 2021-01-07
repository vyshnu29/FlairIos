import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
import Validations from "../../../../../shared/getMetaInfo"
import GrantRequest from "../GrantRequest"
import PropTypes from "prop-types"
import { configuration } from "../../../../../config/companyConfig"
import parser from "html-react-parser"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import CircularProgress from "@material-ui/core/CircularProgress"
import dateFormatter from "../../../../../shared/validation"

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
}))

const steps = ["Review", "Grant", "Preview"]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Presentation(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const {
    reqData,
    signatures,
    letters,
    handleChange,
    handleDateChange,
    handleGrant,
    description,
    activeStep,
    setActiveStep,
    clearValues,
    getSelectedLetterContent,
    letterContent,
    gettingContent,
    handleDesc,
    loggedInEmployee,
    state,
  } = props
     const info = {
       letter: state.letter,
       today_date: state.today_date,
       signature: state.signature,
     }
     let descriptionData = description
     let allValuesFilled = 0
     Object.entries(info).forEach(([key, value]) => {
       if (key === "today_date" && isNaN(Date.parse(value))) allValuesFilled++
       else if (value.trim() === "") allValuesFilled++
       else if (descriptionData.trim() === "") allValuesFilled++
     })
     console.log(allValuesFilled,descriptionData.trim() === "",description, allValuesFilled ? true : false)
     let allTrue = allValuesFilled ? true : false
  const validate = new Validations()
  const employee = props.employee

  console.log(props)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const formatter = (date) => {
    let final = ""
    try {
      final = Intl.DateTimeFormat(
        configuration["date-code"],
        configuration.dateformat
      ).format(new Date(date))
    } catch (error) {
      final = date
    }
    return final
  }
  const handleClose = () => {
    setOpen(false)
    clearValues()
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1)
    // if (activeStep + 1 === 2) {
    //   getSelectedLetterContent()
    // }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  console.log(open)
  let employeeReqFields = []
  if (Object.keys(employee).length && Object.keys(reqData).length)
    employeeReqFields = [
      {
        field: "University name",
        isFilled: reqData.additionalDetails.universityDetails.schoolname
          ? true
          : false,
        value: reqData.additionalDetails.universityDetails.schoolname,
      },
      {
        field: "University address",
        isFilled: reqData.additionalDetails.universityDetails.address.length
          ? true
          : false,
        value: reqData.additionalDetails.universityDetails.address,
      },
      {
        field: "Reporting manager/Supervisor",
        isFilled:
          employee.personal.hasOwnProperty("reportingmanager") &&
          employee.personal.reportingmanager
            ? true
            : false,
        value: employee.personal.hasOwnProperty("reportingmanager")
          ? validate.emailToName(employee.personal.reportingmanager)
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
        field: "Employee date of joining",
        isFilled:
          employee.personal.hasOwnProperty("dateofjoining") &&
          !isNaN(Date.parse(employee.personal.dateofjoining))
            ? true
            : false,
        value: employee.personal.hasOwnProperty("dateofjoining")
          ? formatter(employee.personal.dateofjoining)
          : "----",
      },
      {
        field: "Gender",
        isFilled: employee.personal.gender.length ? true : false,
        value: employee.personal.gender,
      },
      {
        field: "Salary",
        isFilled: true,
        value: "1300$",
      },
    ]

  const companyReqFields = [
    {
      field: "Company name",
      isFilled: configuration.client.length ? true : false,
      value: configuration.client.length ? configuration.client : "",
    },
    {
      field: "Company E-verify number",
      isFilled: configuration.contactdetails.eVerifyNo.length ? true : false,
      value: configuration.contactdetails.eVerifyNo.length
        ? configuration.contactdetails.eVerifyNo
        : "",
    },
    {
      field: "Company EIN number",
      isFilled: configuration.contactdetails.einNo.length ? true : false,
      value: configuration.contactdetails.einNo.length
        ? configuration.contactdetails.einNo
        : "",
    },
    {
      field: "Company address",
      isFilled: configuration.contactdetails.address.length ? true : false,
      value: configuration.contactdetails.address.length
        ? configuration.contactdetails.address
        : "",
    },
    {
      field: "Company phone number",
      isFilled: configuration.contactdetails.phoneno.length ? true : false,
      value: configuration.contactdetails.phoneno.length
        ? configuration.contactdetails.phoneno
        : "",
    },
    {
      field: "HR mail-ID",
      isFilled: true,
      value: "hr@flairtechno.com",
    },
    {
      field: "Accounts mail-ID​",
      isFilled: true,
      value: "accounts@flairtechno.com",
    },
  ]

  const ReviewForm = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Review
        </Typography>
        <List disablePadding>
          {employeeReqFields.map((item, index) => (
            <div>
              <ListItem className={classes.listItem} key={index}>
                <ListItemText
                  className={item.isFilled ? "text-dark" : "text-danger"}
                  primary={item.field}
                />
                <Typography variant="body2">{item.value}</Typography>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <List disablePadding>
          {companyReqFields.map((item, index) => (
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
            <Typography variant="body2">{reqData.subject} </Typography>
          </ListItem>
          <Divider />
        </List>
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Description" />
            <Typography variant="body2">
              {parser(reqData.description)}{" "}
            </Typography>
          </ListItem>
          <Divider />
        </List>
        <List disablePadding>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Document" />
            <Typography variant="body2">
              {reqData.req_doc !== "" ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={reqData.req_doc}
                >
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

  const PreviewLetter = () => {
    return (
      <div>
        Preview will be coming soon
        {/* {gettingContent ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : null}
        {letterContent !== "" && (
          <div className="border p-3 m-2">{parser(letterContent)}</div>
        )} */}
      </div>
    )
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ReviewForm />
      case 1:
        return (
          <GrantRequest
            reqData={reqData}
            signatures={signatures}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleDesc={handleDesc}
            info={info}
            letters={letters}
          />
        )
      case 2:
        return <PreviewLetter />
      default:
        return <ReviewForm />
    }
  }

  return (
    <div>
      <div className={classes.new}>
        {
          (!(loggedInEmployee === reqData.uid))
            ?
          <IconButton onClick={handleClickOpen} color="primary">
            <CheckCircleOutline />
            </IconButton>
            :
            null
        }
      </div>
      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
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
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Issue letter
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
                    {activeStep === 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          handleNext()
                        }}
                        className={classes.button}
                        disabled={employeeReqFields.some(
                          (item) => item.isFilled === false
                        )}
                      >
                        Next
                      </Button>
                    ) : null}
                    {activeStep === 1 ? (
                      allTrue ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            handleNext()
                            // getSelectedLetterContent()
                          }}
                          className={classes.button}
                          disabled
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            handleNext()
                            // getSelectedLetterContent()
                          }}
                          className={classes.button}
                          
                        >
                          Next
                        </Button>
                      )
                    ) : null}
                    {activeStep === 2 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          handleClose()
                          handleGrant(e)
                        }}
                        className={classes.button}
                      >
                        Issue
                      </Button>
                    ) : null}
                  </div>
                </React.Fragment>
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </Dialog>
    </div>
  )
}

Presentation.propTypes = {
  reqData: PropTypes.object,
}
