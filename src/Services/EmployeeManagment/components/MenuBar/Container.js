import React, { useState } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import Spinner from 'react-native-loading-spinner-overlay'

function Container(props) {
  const [state, setState] = useState({
    value: 1,
  })
  const handleChange = (e, v) => {
    setState({
      ...state,
      value: v,
    })
  }
  if (isLoaded(props.employeeProfile)) {
    return (
        <Presentation
          {...props}
          value={state.value}
          handleChange={handleChange}
        />
    )
  }
  return (
  <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  const employeeProfile = state.firestore.ordered.employeeProfile
    ? state.firestore.ordered.employeeProfile[0]
      ? state.firestore.ordered.employeeProfile[0].id === ownProps.Id
        ? state.firestore.ordered.employeeProfile[0]
        : undefined
      : undefined
    : state.firestore.ordered.employeeProfile
  return {
    id: ownProps.Id,
    employeeProfile: employeeProfile,
    emergencycontactData: employeeProfile
      ? employeeProfile.emergencycontact
      : employeeProfile,
    employementhistoryData: employeeProfile
      ? employeeProfile.employmenthistory
      : employeeProfile,
    workauthData: employeeProfile ? employeeProfile.workauth : employeeProfile,
    educationhistory: employeeProfile
      ? employeeProfile.educationhistory
      : employeeProfile,
    personal: employeeProfile ? employeeProfile.personal : employeeProfile,
    mailingaddress: employeeProfile
      ? employeeProfile.mailingaddress
      : employeeProfile,
    //profile: employeeProfile,
  }
}
export default compose(
  firestoreConnect((props) => {
    if (!props.employeeProfile)
      return [
        {
          collection: "EMPLOYEES",
          doc: props.Id,
          storeAs: "employeeProfile",
        },
      ]
    return []
  }),
  connect(mapStateToProps)
)(Container)
