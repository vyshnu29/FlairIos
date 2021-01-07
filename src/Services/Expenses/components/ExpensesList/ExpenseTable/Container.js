import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import {
  loadApprovedExpenses,
  loadRejectedExpenses,
  loadSubmittedExpenses,
  unSubscribeListener,
  setState,
  loadMyExpenses,
} from "../../../middleware/expenseList"


function Container(props) {
  const {
    _load_submitted_expenses,
    _load_approved_expenses,
    _load_rejected_expenses,
    _un_subscribe_listener,
    _load_my_expenses,
    _set_state,
    loggedInEmployee,
    state,
    condition,
    modules,
    clientView,
  } = props
  console.log(loggedInEmployee)
  const tabPair = [
    "submittedExpenses",
    "approvedExpenses",
    "rejectedExpenses",
    "myExpenses",
  ]

  useEffect(() => {
    let employeeID = props.employeeID ? props.employeeID : loggedInEmployee
    let individual = props.individual ? props.individual : false
    let clientID = props.clientID ? props.clientID : ""
    let isClientView = clientView ? clientView : false
    {
      if (modules.includes("timesheets-manager" || "console-customization")) {
        individual = props.individual ? props.individual : false
      } else {
        individual = props.individual ? props.individual : true
      }
    }

    let payload = {
      employeeId: employeeID,
      individual: individual,
      clientID: clientID,
      isClientView: isClientView,
    }
    console.log(payload)
    _un_subscribe_listener(tabPair[condition])
    switch (condition) {
      case 0:
        return _load_submitted_expenses(payload)

      case 1:
        return _load_approved_expenses(payload)

      case 2:
        return _load_rejected_expenses(payload)

      case 3:
        return _load_my_expenses(payload)

      default:
        break
    }
  }, [condition])

  return (
   
      <Presentation
        state={state}
        {...props}
        condition={condition}
        tabPair={tabPair}
        loggedInEmployee={loggedInEmployee}
      />
  
  )
}

const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    state: state.expenses.expensesList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_submitted_expenses: (payload) =>
      dispatch(loadSubmittedExpenses(payload)),
    _load_approved_expenses: (payload) =>
      dispatch(loadApprovedExpenses(payload)),
    _load_rejected_expenses: (payload) =>
      dispatch(loadRejectedExpenses(payload)),
    _load_my_expenses: (payload) => dispatch(loadMyExpenses(payload)),
    _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
