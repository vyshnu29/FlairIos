import React from "react"
import InvoicePreview from "../../../../../Invoices/components/InvoicesList/Actions/InvoicePreview"

function Presentation(props) {
  const { index, clientInvoices } = props
  return (
    <div>
      <InvoicePreview {...clientInvoices[index]} />
    </div>
  )
}

export default Presentation
