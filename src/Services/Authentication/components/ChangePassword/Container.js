import React, { useState } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { changePassword } from "../../middleware"

function Container(props) {
	const { changePassword } = props

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.navigation.goBack()
    changePassword(password)
  }
	return (
      <Presentation
        password={password}
        {...props}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassword: (password) => {
      dispatch(changePassword(password))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
