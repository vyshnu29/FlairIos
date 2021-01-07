import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import parser from "html-react-parser"
import PageTemplate from "../../../../../shared/PageTemplate"
import Dialog from "@material-ui/core/Dialog"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { PDFExport } from "@progress/kendo-react-pdf"
// import { DataContext } from '../../contexts/data'
// import { savePDF } from '@progress/kendo-react-pdf';
import { configuration } from "../../../../../config/companyConfig"
import store from "../../../../../store/Index"
import useStyles from "../../../../EmployeeManagment/styles/PreviewPDFStyles"
import state from "../../../../EmployeeManagment/state/employeeProfile"

function Presentation(props) {
  let {
    pdfExportComponent,
    letterHtmlContent,
    btnContent,
    headerAndFooter,
    iconBtn,
    isString,
    isWaterMarkRequired,
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    previewDialog,
    reqData,
    stateLetterContent,
    isLoadingLetterContent,
  } = props
  console.log(stateLetterContent)
  let htmlContent = !isLoadingLetterContent
    ? stateLetterContent.data.content
    : "<div></div>"
  // const [state] = useContext(DataContext)
  const style = {
    background: {
      backgroundImage: `url(${
        store.getState().console.companyDetails.images.waterMark
      })`,
      backgroundSize: "70% 25%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    content: {
      height: "100%",
      width: "100%",
    },
  }

  const Header = () => {
    return (
      <div>
        <header
          style={{ position: "absolute", top: "1px", left: "1px" }}
        ></header>

        <footer
          style={{ position: "absolute", bottom: "-16px", left: "1px" }}
        ></footer>
      </div>
    )
  }

  const classes = useStyles()

  // if(typeof(htmlContent) === 'string')
  return (
    <div>
      {iconBtn ? (
        <IconButton onClick={handleClickOpen} color="primary">
          {btnContent}
        </IconButton>
      ) : (
        <Button
          className="mt-3 mb-3"
          onClick={handleClickOpen}
          variant="contained"
          fullWidth
          color="primary"
        >
          {btnContent}
        </Button>
      )}
      <Dialog open={previewDialog === reqData.id} onClose={handleClose}>
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
            <PDFExport
              paperSize="A4"
              margin="2cm"
              ref={(component) => (pdfExportComponent = component)}
              pageTemplate={headerAndFooter ? PageTemplate : Header}
            >
              <div
                id="taskpdfid"
                style={
                  isWaterMarkRequired
                    ? style.background
                    : { backgroundColor: "transparent" }
                }
              >
                <div style={style.content}>
                  {isString ? parser(htmlContent) : htmlContent}
                </div>
              </div>
            </PDFExport>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                pdfExportComponent.save()
              }}
              className={classes.submit}
            >
              Download
            </Button>
          </Paper>
        </main>
      </Dialog>
    </div>
  )
}

export default Presentation
