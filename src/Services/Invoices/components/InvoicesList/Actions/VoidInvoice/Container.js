import React, { useState, useEffect } from 'react'
import Presentation from "./Presentation"
import { makeInvoiceVoid } from "../../../../middleware/invoiceList"
import { connect } from "react-redux"

function Container(props) {
  const { make_invoice_void, state, row } = props
  const [open, setOpen] = React.useState(false);
  const [isVoiding, setIsVoiding] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    make_invoice_void(props.row.id)
    handleClose()
  }

  useEffect(() => {
    setIsVoiding(state.actions.voidingInvoices.includes(row.id))
  }, [state.actions.voidingInvoices.includes(row.id)])

  return (
    <div>
      <Presentation
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleYes={handleYes}
        open={open}
        isVoiding={isVoiding}
        {...props} />
    </div>
  )
}

const mapStateToProps = state => {
  return { state: state.invoice.invoiceList }
}

const mapDispatchToProps = dispatch => ({
  make_invoice_void: (invoiceID) => dispatch(makeInvoiceVoid(invoiceID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
