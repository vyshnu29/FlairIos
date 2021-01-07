import React from "react"
import { connect } from "react-redux"
import { deleteEmployee, inviteEmployee } from "../../middleware"
import Presentation from "./Presentation"

function Container(props) {
	const onInviteAgain = (listOfMails) => {
		const { inviteEmployee } = props
		listOfMails.forEach((email) => {
			inviteEmployee({
				firstname: "",
				lastname: "",
				phonenumber: "",
				email: email,
				dob: "",
				branch: "",
			})
		})
	}

	return (

			<Presentation {...props} onInviteAgain={onInviteAgain} />
	)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    inviteEmployee: (payload) => {
      dispatch(inviteEmployee(payload))
    },
    onDelete: (uid) => {
      dispatch(deleteEmployee(uid))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)
