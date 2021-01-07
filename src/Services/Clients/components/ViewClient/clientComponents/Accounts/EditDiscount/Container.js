import React, { useState, useEffect } from "react"
import Presentation from "./Presentation"
import { accountsUpdate } from "../../../../../middleware"
import { connect } from "react-redux"

function Container(props) {
  const { accounts, accountsUpdate } = props
  const [state, setState] = useState({
    status: "",
    discountDetails: [
      {
        name: "",
        value: 0,
        type: "",
      },
    ],
  })

  useEffect(() => {
    const tempState = {}
    Object.entries(accounts).forEach(([key, value]) => {
      if (state.hasOwnProperty(key)) {
        tempState[key] = value
      }
    })
    console.log(tempState)
    setState((state) => ({ ...state, ...tempState }))
  }, [accounts])

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((state) => ({ ...state, [name]: value }))
  }

  const handleDiscountDetails = (event, index) => {
    const { name, value } = event.target
    let data = state.discountDetails
    if (index <= data.length - 1) {
      data[index][name] = value
    }
    setState((state) => ({ ...state, discountDetails: data }))
  }

  const onAddDiscount = () => {
    let discountDetails = state.discountDetails
    discountDetails = [
      ...discountDetails,
      {
        name: "",
        value: 0,
        type: "",
      },
    ]
    setState((state) => ({ ...state, discountDetails }))
  }

  const onRemoveDiscount = (index) => {
    let discountDetails = []
    discountDetails = state.discountDetails.filter((_, ind) => index !== ind)
    setState((state) => ({ ...state, discountDetails }))
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
    const payload = {}
    Object.entries(state).forEach(([key, value]) => {
      payload[key] = value
    })
    accountsUpdate(payload)
	}

  return (
    <div>
      <Presentation
        {...state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDiscountDetails={handleDiscountDetails}
        onAddDiscount={onAddDiscount}
        onRemoveDiscount={onRemoveDiscount}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    accountsUpdate: (payload) => {
      dispatch(
        accountsUpdate(
          payload,
          ownProps.accounts.clientId,
          ownProps.accounts.id
        )
      )
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
