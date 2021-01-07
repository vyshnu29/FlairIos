import React, { useEffect, useState } from 'react';
import Presentation from "./Presentation"
import validate from "../../../../../../../shared/validation"
import { accountsUpdate } from "../../../../../middleware"
import { connect } from "react-redux"

function Container(props) {
	const { accounts, accountsUpdate } = props
	const [state, setState] = useState({
    to: [],
    cc: [],
    bcc: [],
    helperText: {
      to: "",
      cc: "",
      bcc: "",
    },
	})

	useEffect(() => {
		let tempState = {}
		Object.entries(accounts).forEach(([key, value]) => {
			if (state.hasOwnProperty(key)) {
				tempState[key] = value
			}
		})
		setState((state) => ({ ...state, ...tempState }))
	}, [accounts])

	const handleAdd = (name, chip) => {
    let data = state[name]
    if (validate.checkEmail(chip)) {
      data = [...data, chip]
      setState((state) => ({
        ...state,
        helperText: {
          to: "",
          cc: "",
          bcc: "",
        },
      }))
    } else {
			setState((prevState) => ({
				...prevState,
        helperText: {
          ...prevState.helperText,
          [name]: "Enter valid email",
        },
      }))
    }
    setState((state) => ({ ...state, [name]: data }))
    console.log("add", data)
	}
	
	const handleDelete = (name, index) => {
    let data = state[name]
    data.splice(index, 1)
    setState((state) => ({ ...state, [name]: data }))
    console.log("delete", data)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
    const payload = {}
    Object.entries(state).forEach(([key, value]) => {
      if (key !== "helperText") {
        payload[key] = value
      }
    })
    accountsUpdate(payload)
	}

	return (
    <div>
      <Presentation
        {...state}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
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
