import React, { useEffect, useState } from 'react';
import Presentation from "./Presentation"
import { accountsUpdate } from "../../../../../middleware"
import { connect } from "react-redux"

function Container(props) {
	const { accounts, accountsUpdate } = props
	const [state, setState] = useState({
    jobTitle: "",
    email: "",
    homePhone: "",
    services: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    mobileNumber: "",
	})

	useEffect(() => {
		const tempState = {}
		Object.entries(accounts).forEach(([key, value]) => {
			if (state.hasOwnProperty(key)) {
				tempState[key] = value
			}
		})
		setState((state) => ({ ...state, ...tempState }))
	}, [accounts])

	const handleChange = (event) => {
		const { name, value } = event.target
    setState((state) => ({ ...state, [name]: value }))
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
			/>
		</div>
	);
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
