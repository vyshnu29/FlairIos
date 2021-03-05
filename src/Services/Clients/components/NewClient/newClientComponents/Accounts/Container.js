import React from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { uploadAccountsInformation } from "../../../../middleware"
import validate from "../../../../../../shared/validation"

function Container(props) {
  const { accounts, setAccountsInformation } = props

  const handleChange = (name,value) => {
    setAccountsInformation({
      name: name,
      value: value,
    })
  }

  const handleAdd = (name, chip) => {
    console.log("S",chip)
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

  const handleDiscountDetails = (name,value) => {
    let discountDetails = accounts.discountDetails
    if (0 <= discountDetails.length - 1) {
      discountDetails[0][name] = value
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
      <Presentation
        accounts={accounts}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        onAddDiscount={onAddDiscount}
        onRemoveDiscount={onRemoveDiscount}
        handleDiscountDetails={handleDiscountDetails}
      />
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
