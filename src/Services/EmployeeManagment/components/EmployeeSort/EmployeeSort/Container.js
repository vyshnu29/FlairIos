import React, { useEffect, useState } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import {
  loadAllEmployees,
  unSubscribeListener,
  setState,
  loadActiveEmployees,
  loadInActiveEmployees,
  loadSuspendedEmployees,
} from "../../../middleware/employeeList"

function Container(props) {
  const {
    _load_all_employees,
    _set_state,
    loggedInEmployee,
    _load_active_employee,
    _un_subscribe_listener,
    _load_inactive_employee,
    _load_suspended_employee,
    employeelist,
    condition,
  } = props
  const [selected, setSelected] = useState([])
  const [originalList, setOriginalList] = useState([])

  const handleSelect = (employee) => {
    if (selected.includes(employee)) {
      const index = selected.indexOf(employee)
      let newlist = selected
      newlist.splice(index, 1)
      setSelected(newlist)
    } else {
      let append = [...selected, employee]
      setSelected(append)
    }
  }

  const handleSelectAll = (e, employees) => {
    let allMails = []
    employees.forEach((item) => {
      if (originalList.includes(item)) allMails.push(item)
    })
    if (e.target.checked) setSelected(allMails)
    else setSelected([])
  }

  const tabPair = [
    "allEmployees",
    "activeEmployees",
    "inActiveEmployees",
    "suspendedEmployees",
    "selectedEmployees",
  ]

  const isLoaded = props[`isLoaded_${tabPair[condition]}`]
  const noOfLoadings = props[`noOfLoadings_${tabPair[condition]}`]
  useEffect(() => {
    _un_subscribe_listener(tabPair[condition])
    switch (condition) {
      case 0:
        return _load_all_employees()

      case 1:
        return _load_active_employee()

      case 2:
        return _load_inactive_employee()

      case 3:
        return _load_suspended_employee()

      default:
        break
    }
  }, [condition])
  return (
      <Presentation
        employeelist={employeelist}
        condition={condition}
        tabPair={tabPair}
        isLoaded={isLoaded}
        noOfLoadings={noOfLoadings}
        {...props}
        selected={selected}
        originalList={originalList}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  const tabPair = [
    "allEmployees",
    "activeEmployees",
    "inActiveEmployees",
    "suspendedEmployees",
    "selectedEmployees",
  ]
  return {
    employeelist: state.employee.employeeList,
    [`isLoaded_${tabPair[ownProps.condition]}`]: state.employee.employeeList[
      tabPair[ownProps.condition]
    ].isLoading,
    [`noOfLoadings_${tabPair[ownProps.condition]}`]: state.employee
      .employeeList[tabPair[ownProps.condition]].noOfLoadings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_all_employees: () => dispatch(loadAllEmployees()),
    _load_active_employee: () => dispatch(loadActiveEmployees()),
    _load_inactive_employee: () => dispatch(loadInActiveEmployees()),
    _load_suspended_employee: () => dispatch(loadSuspendedEmployees()),
    _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
