import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import SunEditor from "suneditor-react"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import Validations from "../../../../../shared/getMetaInfo"
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
  new: {
    float: "right",
  },
}))

export default function Presentation(props) {
  const classes = useStyles()

  const {
    handleChange,
    handleDateChange,
    signature,
    today_date,
    letter,
    handleGrant,
    letters,
    signatures,
    reqData,
    description,
    handleDesc,
  } = props
  console.log(props)
  const validate = new Validations()
  let filtersign = signatures.filter((item) => item.employeeID != reqData.uid)
  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <form onSubmit={handleGrant}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    select
                    label="Choose letter"
                    required
                    name="letter"
                    value={letter}
                    style={{ width: "40%" }}
                    onChange={(e) => handleChange("letter", e.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>

                    {letters
                      .filter(
                        (letter) =>
                          letter.type.replace(/ /g, "").toLowerCase() ===
                          reqData.subject.replace(/ /g, "").toLowerCase()
                      )
                      .map((option) => (
                        <MenuItem key={option.type} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      label="Today date"
                      format="MM/dd/yyyy"
                      invalidDateMessage=""
                      value={today_date ? today_date : null}
                      onChange={(date) => handleDateChange("today_date", date)}
                      name="today_date"
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    select
                    label="Choose signature"
                    required
                    name="signature"
                    value={signature}
                    style={{ width: "40%" }}
                    onChange={(e) => handleChange("signature", e.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>

                    {filtersign.map((option) => (
                      <MenuItem
                        key={option.employeeID}
                        value={option.employeeID}
                      >
                        {validate.emailToName(option.employeeID)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <p>Description*:</p>
                  <SunEditor
                    placeholder="Description"
                    setContents={description}
                    onChange={(data) => handleDesc("description", data)}
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
                {/* {
                      letter !== "" && !isNaN(Date.parse(today_date)) && signature !== "" ? 
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Issue letter
                      </Button>
                      :
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled
                      >
                        Issue letter
                      </Button>
                    } */}
              </Grid>
            </form>
          </React.Fragment>
        </Paper>
      </main>
    </div>
  )
}
