import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {ActivityIndicator} from 'react-native'
import Presentation from "./Presentation"
import { loadProject } from "../../middleware/projectsList"
 
function Container(props) {
  const { names, projectMembers, handleEmployeesDefault, isAdded } = props
  const [state, setState] = React.useState({
	employees: [],
	addedNames:[],
  })
  const [data, setData] = useState({
    data: [],
  })
  const handleEmployees = (e, value , name) => {
	let taskArray = state.employees
	let EmployeeName = state.addedNames
	if (e) {
	  taskArray = [...taskArray, value]
	  EmployeeName = [...EmployeeName, name]
	} else {
	  const index = taskArray.indexOf(value)
	  taskArray.splice(index, 1)
	  const index1 = EmployeeName.indexOf(name)
	  EmployeeName.splice(index1, 1)
	}
    setState({
      ...state,
	  employees: taskArray,
	  addedNames: EmployeeName
    })
    handleEmployeesDefault(taskArray)
  }
  useEffect(() => {
    let data = []
    if (isLoaded(names))
      data = Object.values(names).filter((e) => {
        if (projectMembers) {
          return !projectMembers.includes(e.uid) && e.uid !== undefined
        } else {
          return e.uid !== undefined
        }
      })
    setData({
      ...data,
      data: data,
    })
  }, [])

  if (isLoaded(names)) {
    return (
      <Presentation
        isAdded={isAdded}
		employees={state.employees}
		addedNames={state.addedNames}
        handleEmployees={handleEmployees}
        data={data.data}
      />
    )
  }
  return (
  <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    names: state.firestore.ordered.names[0],
  }
}

export default connect(mapStateToProps)(Container)