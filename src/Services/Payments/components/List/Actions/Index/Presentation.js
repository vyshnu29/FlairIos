import React from "react"
import AddDiscount from "../AddDiscount"
import InvoicePreview from "../InvoicePreview"
import PaymentHistory from "../PaymentHistory"

function Presentation(props) {
  const { rowData, totalAmount } = props
  return (
    <div className="d-flex">
      <AddDiscount {...rowData.paymentDiscountDetails} index={rowData.tableData.id} />
      <InvoicePreview index={rowData.tableData.id} />
      <PaymentHistory id={rowData.id} totalAmount={totalAmount} />
    </div>
  )
}

export default Presentation
