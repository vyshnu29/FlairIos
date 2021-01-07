import React from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { uploadAccountsInformation } from "../../../../middleware"
import validate from "../../../../../../shared/validation"

function Container(props) {
  const { accounts, setAccountsInformation } = props

  const handleChange = (event) => {
    setAccountsInformation({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const handleAdd = (name, chip) => {
    let data = accounts[name]
    if (validate.checkEmail(chip)) {
      data = [...data, chip]
      setAccountsInformation({
        name: "helperText",
        value: {
          to: "",
          cc: "",
          bcc: "",
        },
      })
    } else {
      let prevState = accounts.helperText
      setAccountsInformation({
        name: "helperText",
        value: {
          ...prevState,
          [name]: "Enter valid email",
        },
      })
    }
    setAccountsInformation({
      name,
      value: data,
    })
  }

  const handleDelete = (name, index) => {
    let data = accounts[name]
    setAccountsInformation({
      name,
      value: data.filter((_, i) => i !== index),
    })
  }

  const handleDiscountDetails = (event, index) => {
    let discountDetails = accounts.discountDetails
    if (index <= discountDetails.length - 1) {
      discountDetails[index][event.target.name] = event.target.value
    }
    setAccountsInformation({
      name: "discountDetails",
      value: discountDetails,
    })
  }

  const onAddDiscount = () => {
    let discountDetails = accounts.discountDetails
    discountDetails = [
      ...discountDetails,
      {
        name: "",
        value: 0,
        type: "",
      },
    ]
    setAccountsInformation({
      name: "discountDetails",
      value: discountDetails,
    })
  }

  const onRemoveDiscount = (index) => {
    let discountDetails = []
    discountDetails = accounts.discountDetails.filter((_, ind) => index !== ind)
    setAccountsInformation({
      name: "discountDetails",
      value: discountDetails,
    })
  }

  return (
    <div>
      <Presentation
        accounts={accounts}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        onAddDiscount={onAddDiscount}
        onRemoveDiscount={onRemoveDiscount}
        handleDiscountDetails={handleDiscountDetails}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.client.newClient.accounts,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAccountsInformation: (payload) => {
      dispatch(uploadAccountsInformation(payload))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
