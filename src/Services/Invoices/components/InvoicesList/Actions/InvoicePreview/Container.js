import React from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { downloadInvoice, getInvoiceHTML } from "../../../../middleware/invoiceList"

function Container(props) {
  const { printInvoice, invoicePreview, getHTML } = props

  return (
    <div>
      <Presentation printInvoice={printInvoice} invoicePreview={invoicePreview} getHTML={getHTML} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    companyDetails: state.console.companyDetails,
    invoicePreview: state.invoice.invoiceList.actions.invoicePreview,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { generatedInvoiceFilePath } = ownProps.invoiceDetails
  return {
    printInvoice: () => {
      dispatch(downloadInvoice(generatedInvoiceFilePath))
    },
    getHTML: () => {
      dispatch(getInvoiceHTML(ownProps.id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
