import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import {
  loadAllProjects,
  loadClosedProjects,
  loadInProgressProjects,
  loadOverDueProjects,
  setState,
  unSubscribeListener,
} from "../../../middleware/projectsList"

function Container(props) {
  const {
    _load_all_projects,
    _load_overdue_projects,
    _load_inprogress_projects,
    _load_closed_projects,
    _set_state,
    loggedInEmployee,
    state,
    condition,
    modules,
    _un_subscribe_listener,
  } = props
  const tabPair = [
    "allProjects",
    "inProgressProjects",
    "overDueProjects",
    "closedProjects",
  ]

  useEffect(() => {
    _un_subscribe_listener(tabPair[condition])
    switch (condition) {
      case 0:
        return _load_all_projects()

      case 1:
        return _load_inprogress_projects()

      case 2:
        return _load_overdue_projects()

      case 3:
        return _load_closed_projects()

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
    state: state.projects.projectsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_all_projects: () => dispatch(loadAllProjects()),
    _load_overdue_projects: (payload) => dispatch(loadOverDueProjects(payload)),
    _load_inprogress_projects: (payload) =>
      dispatch(loadInProgressProjects(payload)),
    _load_closed_projects: (payload) => dispatch(loadClosedProjects(payload)),
    _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
