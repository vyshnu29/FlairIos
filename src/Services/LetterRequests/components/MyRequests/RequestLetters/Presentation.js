import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import SunEditor from "suneditor-react"
import { configuration } from "../../../../../config/companyConfig"
import { GoFileSymlinkFile } from "react-icons/go"
import Button from "@material-ui/core/Button"

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
    type,
    description,
    handleChange2,
    req_doc,
    progress1,
    isUploading,
    handleDescription,
  } = props

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom></Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    select
                    id="lettertype"
                    label="Choose Type"
                    required
                    name="type"
                    value={type}
                    style={{ width: "40%" }}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <MenuItem value="">None</MenuItem>
                    {configuration.letterTypes.map((option) => (
                      <MenuItem
                        key={option.replace(/ /g, "").toLowerCase()}
                        value={option.replace(/ /g, "").toLowerCase()}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <p>Description*:</p>
                  <SunEditor
                    placeholder="Description"
                    setContents={description}
                    onChange={(data) => handleDescription("description", data)}
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
                <Grid item xs={12} sm={12}>
                  {/* <FileUploader /> */}
                  <div>
                    <input
                      className="d-none"
                      id="contained-button-file-ehfile"
                      multiple
                      type="file"
                      onChange={handleChange2}
                    />
                    <label htmlFor="contained-button-file-ehfile">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Document
                      </Button>
                    </label>
                  </div>
                  <p>
                    {req_doc !== "" ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={req_doc}
                      >
                        <GoFileSymlinkFile size={22} />
                      </a>
                    ) : (
                      <p>No file choosen</p>
                    )}{" "}
                  </p>
                  {isUploading ? <p>Uploading please wait...</p> : ""}
                </Grid>
                {/* {
                    type !== "" && description !== "" ? 
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setOpen(false)}
                      className={classes.submit}
                    >
                      Request
                    </Button>
                    :
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled
                    >
                      Request
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
