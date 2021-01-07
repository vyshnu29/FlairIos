import axios from "axios"
import {
  modulesRequest,
  modulesSuccess,
  modulesFailure,
  inviteEmployeeRequest,
  inviteEmployeeSuccess,
  inviteEmployeeError,
  employeesRequest,
  employeesSuccess,
  employeesFailure,
  setExcelInvites,
  allModulesFailure,
  allModulesSuccess,
  allModulesRequest,
  employeeRegistrationRequest,
  employeeRegistrationSuccess,
  employeeRegistrationFailure,
  updateProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  enableEmployeeFailure,
  enableEmployeeRequest,
  enableEmployeeSuccess,
  suspendEmployeeFailure,
  suspendEmployeeRequest,
  suspendEmployeeSuccess,
} from "../actions/actionCreators"
import {
	waitingMsg,
	stopWaitMsg,
	errorMsg,
	successMsg,
} from "../../../shared/SnackBars/index"
import validate from "../../../shared/validation"
import make_API_call from "../../../providers/REST_API"
import { configuration } from "../../../config/companyConfig"

export function getModules() {
	return (dispatch) => {
		dispatch(modulesRequest())
		axios
			.get("/employee/modules")
			.then((response) => {
				console.log(response)
				return dispatch(
					modulesSuccess({
						accessModules: response.data,
					})
				)
			})
			.catch((error) => {
				console.error(error)
				dispatch(modulesFailure({ ...error }))
			})
	}
}

export function getAllModules() {
	return (dispatch) => {
		dispatch(allModulesRequest())
		axios
			.get("/employee/allmodules")
			.then((response) => {
				console.log(response.data)
				dispatch(allModulesSuccess({ allModules: response.data }))
			})
			.catch((err) => {
				console.error(err)
				dispatch(allModulesFailure(err))
			})
	}
}

export function getEmployees() {
	return (dispatch, getState, { getFirebase }) => {
		dispatch(employeesRequest())
		const firebase = getFirebase()
		firebase
			.firestore()
			.collection("EMPLOYEES")
			.onSnapshot((querySnapshot) => {
				if (querySnapshot.size) {
					const employeelist = querySnapshot.docs.map((doc) => doc.data())
					dispatch(employeesSuccess({ employeelist }))
				} else {
					dispatch(employeesFailure({ employeelist: [] }))
				}
			})
	}
}

export function deleteEmployee(uid) {
  return (dispatch) => {
    waitingMsg("Deleting the employee...")
    make_API_call("put", `/employee/${uid}/deleteInactive`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export function inviteEmployee(payload) {
	return (dispatch) => {
		dispatch(inviteEmployeeRequest())

		const { email, firstname, lastname, dob, branch, phonenumber } = payload
		if (!validate.checkEmail(email)) return errorMsg("Invalid email format")
		waitingMsg("Invitation mail is being sent...")
		axios
			.post("/auth/inviteemployee", {
				employeeEmail: email,
				employeeInfo: {
					branch,
					dob,
					firstname,
					lastname,
					phonenumber,
				},
			})
			.then((res) => {
				stopWaitMsg()
				successMsg(email + " has been invited successfully")
				dispatch(inviteEmployeeSuccess())
			})
			.catch((err) => {
				stopWaitMsg()
				errorMsg("Something went wrong!")
				dispatch(inviteEmployeeError())
			})
	}
}

export function setExcelInvite(emails) {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		dispatch(
			setExcelInvites({
				excel_invite: emails.filter((email) => email.shalliInvite === false),
			})
		)
		emails
			.filter((item) => item.shalliInvite === true)
			.forEach((row) => {
				const email = row.email
				const dbRef = firebase.firestore().collection("EXCEL_INVITE").doc(email)
				dbRef.set(row)
			})
	}
}

export function clearExcelInvite() {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		dispatch(setExcelInvites({ excel_invite: [] }))

		firebase
			.firestore()
			.collection("EXCEL_INVITE")
			.get()
			.then((documentSnapshot) => {
				const emails = documentSnapshot.docs.map((doc) => doc.id)
				emails.forEach((email) => {
					firebase.firestore().collection("EXCEL_INVITE").doc(email).delete()
				})
			})
	}
}

export function deleteExcelContent(payload) {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		let data = getState().employee.employeeInvite.excel_invite
		const index = data.indexOf(payload)
		if (index > -1) {
			data.splice(index, 1)
			dispatch(setExcelInvite({ excel_invite: data }))
		} else {
			const dbRef = firebase.firestore().collection("EXCEL_INVITE")
			dbRef.doc(payload.email).delete()
		}
	}
}

export function updateExcelContent(payload) {
	return (dispatch, getState, { getFirebase }) => {
		console.log(getState())
		const { newData, id, oldData } = payload
		const firebase = getFirebase()

		const employees_collection = getState().firestore.ordered.employeelist
		const excel_invite = getState().employee.employeeInvite.excel_invite
		if (
			validate.checkEmail(newData.email) &&
			employees_collection
				.filter((employee) => employee.status !== "inactive")
				.map((user) => user.email)
				.includes(newData.email)
		) {
			newData["validEmail"] = true
			newData["isInviting"] = false
			newData["shalliInvite"] = false
			newData["comment"] = "Already registered"
			let emails = excel_invite
			if (
				excel_invite.map((item) => item.email).includes(newData.email) &&
				id > -1
			) {
				emails[id] = newData
				dispatch(setExcelInvites({ excel_invite: emails }))
			} else {
				const dbRef = firebase.firestore().collection("EXCEL_INVITE")
				dbRef.doc(oldData.email).delete()
				emails = [...emails, newData]
				dispatch(setExcelInvites({ excel_invite: emails }))
			}
		} else if (
			validate.checkEmail(newData.email) &&
			!excel_invite.map((item) => item.email).includes(newData.email)
		) {
			newData["validEmail"] = true
			newData["isInviting"] = true
			newData["shalliInvite"] = true
			newData["comment"] = ""
			const dbRef = firebase.firestore().collection("EXCEL_INVITE")
			if (id > -1) {
				let emails = excel_invite
				emails.splice(id, 1)
				dispatch(setExcelInvites({ excel_invite: emails }))
				dbRef.doc(newData.email).set(newData, { merge: true })
			} else {
				if (oldData.email !== newData.email)
					dbRef
						.doc(oldData.email)
						.delete()
						.then(() => {
							dbRef.doc(newData.email).set(newData, { merge: true })
						})
				else dbRef.doc(newData.email).set(newData, { merge: true })
			}
		} else if (validate.checkEmail(newData.email)) {
			newData["validEmail"] = true
			newData["isInviting"] = true
			newData["shalliInvite"] = true
			newData["comment"] = ""
			const dbRef = firebase
				.firestore()
				.collection("EXCEL_INVITE")
				.doc(newData.email)
			dbRef.set(newData, { merge: true })
			let emails = excel_invite
			console.log(emails)
			emails.splice(id, 1)
			console.log(emails)
			dispatch(setExcelInvites({ excel_invite: emails }))
		} else if (!validate.checkEmail(newData.email)) {
			console.log("last block")
			newData["validEmail"] = false
			newData["isInviting"] = false
			newData["shalliInvite"] = false
			newData["comment"] = "Invalid email format"
			let emails = excel_invite
			const dbRef = firebase.firestore().collection("EXCEL_INVITE")
			if (excel_invite.map((item) => item.email).includes(newData.email)) {
				emails[id] = newData
				dispatch(setExcelInvites({ excel_invite: emails }))
			} else {
				dbRef.doc(oldData.email).delete()
				emails = [...emails, newData]
				dispatch(setExcelInvites({ excel_invite: emails }))
			}
		}
	}
}


export function employeeRegistration(payload, history) {
  return (dispatch) => {
    dispatch(employeeRegistrationRequest())

    // const {} = payload
    waitingMsg("Registration is being processed...")
    axios
      .post(`${configuration.REST_api}/auth/createemployee`, payload)
      .then((res) => {
        stopWaitMsg()
        successMsg("Successfully Registered")
        dispatch(employeeRegistrationSuccess())
        history.push("/")
      })
      .catch((err) => {
        console.log(err)
        stopWaitMsg()
        errorMsg("Something went wrong!")
        dispatch(employeeRegistrationFailure())
      })
  }
}

export function updateProfile(payload) {
  return (dispatch) => {
    dispatch(updateProfileRequest())

    const { employeeID, key, data } = payload
    console.log(payload)
    waitingMsg("Updating is being processed...")
    axios
      .put(`/employee/${employeeID}/updateprofile`, {
        [key]: data,
      })
      .then((res) => {
        stopWaitMsg()
        successMsg("Successfully Updated")
        dispatch(updateProfileSuccess())
        // history.push("/")
      })
      .catch((err) => {
        console.log("failed", err)
        stopWaitMsg()
        errorMsg(err.msg)
        dispatch(updateProfileFailure())
      })
  }
}
export function enableEmployee(payload) {
  return (dispatch) => {
    dispatch(enableEmployeeRequest())

    const { employeeID } = payload
    console.log(payload)
    waitingMsg("Enabling the employee...")
    axios
      .put(`/employee/${employeeID}/enable`, {})
      .then((res) => {
        stopWaitMsg()
        successMsg("Successfully Enabled")
        dispatch(enableEmployeeSuccess())
        // history.push("/")
      })
      .catch((err) => {
        console.log("failed", err)
        stopWaitMsg()
        errorMsg(err.msg)
        dispatch(enableEmployeeFailure())
      })
  }
}
export function suspendEmployee(payload) {
  return (dispatch) => {
    dispatch(suspendEmployeeRequest())

    const { employeeID } = payload
    console.log(payload)
    waitingMsg("Suspending the employee...")
    axios
      .put(`/employee/${employeeID}/suspend`, {})
      .then((res) => {
        stopWaitMsg()
        successMsg("Successfully Suspended")
        dispatch(suspendEmployeeSuccess())
        // history.push("/")
      })
      .catch((err) => {
        console.log("failed", err)
        stopWaitMsg()
        errorMsg(err.msg)
        dispatch(suspendEmployeeFailure())
      })
  }
}