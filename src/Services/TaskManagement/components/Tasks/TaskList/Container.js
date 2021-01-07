import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import {
  loadAllTasks,
  loadClosedTasks,
  loadInProgressTasks,
  loadOpenTasks,
  loadReviewTasks,
  loadOverDueTasks,
  loadSubTasks,
  setState,
  unSubscribeListener,
} from "../../../middleware/tasks"

function Container(props) {
  const {
    _load_all_taskslist,
    _un_subscribe_listener,
    _load_open_taskslist,
    _load_inprogress_taskslist,
    _load_closed_taskslist,
    _load_review_taskslist,
    _load_sub_taskslist,
    _load_overdue_taskslist,
    _set_state,
    loggedInEmployee,
    state,
    condition,
    modules,
    tasksListData,
  } = props

  const tabPair = [
    "allTasksList",
    "openTasksList",
    "inProgressTasksList",
    "overDueTasksList",
    "reviewTasksList",
    "closedTasksList",
    "subTasksList",
  ]

  useEffect(() => {
    let payload = {
      projectID: props.id,
    }
    console.log(payload)
    _un_subscribe_listener(tabPair[condition])
    switch (condition) {
      case 0:
        return _load_all_taskslist(payload)

      case 1:
        return _load_open_taskslist(payload)

      case 2:
        return _load_inprogress_taskslist(payload)

      case 3:
        return _load_overdue_taskslist(payload)
      case 4:
        return _load_review_taskslist(payload)
      case 5:
        return _load_closed_taskslist(payload)
      case 6:
        return _load_sub_taskslist(payload)

      default:
        break
    }
  }, [condition])

  return (
      <Presentation
        {...props}
        condition={condition}
        tabPair={tabPair}
        loggedInEmployee={loggedInEmployee}
        tasksListData={tasksListData}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    tasksListData: state.projects.LoadedTasksList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_all_taskslist: (payload) => dispatch(loadAllTasks(payload)),
    _load_open_taskslist: (payload) => dispatch(loadOpenTasks(payload)),
    _load_inprogress_taskslist: (payload) =>
      dispatch(loadInProgressTasks(payload)),
    _load_review_taskslist: (payload) => dispatch(loadReviewTasks(payload)),
    _load_closed_taskslist: (payload) => dispatch(loadClosedTasks(payload)),
    _load_sub_taskslist: (payload) => dispatch(loadSubTasks(payload)),
    _load_overdue_taskslist: (payload) => dispatch(loadOverDueTasks(payload)),
    _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
