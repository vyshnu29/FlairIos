import React from "react"
import { connect } from "react-redux"
import { setDiscountDetails, addDiscountToOpenBalance } from "../../../../middleware"
import Presentation from "./Presentation"

function Container(props) {
  const { index, handleAddDiscount } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    handleAddDiscount(index)
    handleClose()
  }

  return (
    <div>
      <Presentation
        {...props}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleAdd={handleAdd}
        open={open}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clientInvoices: state.payments.paymentsList.clientInvoices,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: (index, key, value) => {
      dispatch(setDiscountDetails(index, key, value))
    },
    handleAddDiscount: (index) => {
      dispatch(addDiscountToOpenBalance(index))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
