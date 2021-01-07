import React from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"

function Container(props) {
  return (
      <Presentation {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.error(state.firestore.errors.byQuery.deductions)
  return {
    access_modules: state.employee.employeeModules.accessModules,
    deductions: state.firestore.ordered.deductions,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collectionGroup: "DEDUCTIONS",
        where: [["isExist", "==", true]],
        storeAs: "deductions",
      },
    ]
  })
)(Container)