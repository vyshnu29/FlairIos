import React, { useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { forgetPassword } from "../../middleware"

function Container(props) {

	const { forgetPassword } = props

  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    forgetPassword(email)
  }

	return (
      <Presentation
      
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    forgetPassword: (email) => {
      dispatch(forgetPassword(email))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)