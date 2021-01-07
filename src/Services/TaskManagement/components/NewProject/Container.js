import React, { useEffect, useState } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import { projectCreation } from "../../middleware"

function Container(props) {
  const [originalList, setOriginalList] = useState([])
  const { employeelist } = props
  const [state, setState] = useState({
    name: "",
    status: "",
    startdate: "",
    enddate: "",
    projectId: "",
    addedNames:[],
    employees: [],
    isCreated: false,
    useLabels: false,
    useTimeline: false,
  })

  const handleChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    })
  }

  const handleCheck = (name,checked) => {
    setState({
      ...state,
      [name]: checked,
    })
  }
 const handleDateChange = (key, value) => {
    if (value === null)
    setState({
      ...state,
      [key]: "",
    })
    else if (!isNaN(Date.parse(value)))
    setState({
      ...state,
      [key]: new Date(value).toISOString()
    })
       
}

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
  }

  const clearValues = () => {
    setState({
      ...state,
      name: "",
      status: "",
      startdate: "",
      enddate: "",
      projectId: "",
      useLabels: false,
      useTimeline: false,
      employees: [],
      isCreated: false,
    })
  }

  useEffect(() => {
    if (isLoaded(employeelist))
      setOriginalList(employeelist.map((employee) => employee.uid))
  }, [employeelist])

  
  const handleCreate = (e) => {
    e.preventDefault()
    const { projectCreation } = props
    const {
      name,
      status,
      startdate,
      enddate,
      employees,
      projectId,
      useLabels,
      useTimeline,
    } = state
    let projectInfo = {
      title: name,
      status,
      startdate: new Date(startdate).setHours(0, 0, 0, 0),
      enddate: new Date(enddate).setHours(0, 0, 0, 0),
      cid: projectId,
      useLabels,
      useTimeline,
      Users: employees
    }
    projectCreation(projectInfo)

    //  this.clearValues()
  }
  const newProject = {
    name: state.name,
    status: state.status,
    startdate: state.startdate,
    enddate: state.enddate,
    useLabels: state.useLabels,
    useTimeline: state.useTimeline,
    projectId: state.projectId,
  }
  let errCount = 0
  Object.entries(newProject).forEach(([key, value]) => {
    if (
      (key === "startdate" && isNaN(Date.parse(value))) ||
      (key === "enddate" && isNaN(Date.parse(value)))
    )
      errCount++
    else if (
      (key === "projectId" && value.length < 3) ||
      (key === "projectId" && value.length > 10)
    )
      errCount++
    else if (typeof value === "string" && value.trim() === "") errCount++
  })
  const projectsList= props.route.params.projectsList

  return (
      <Presentation
        {...props}
        newProject={newProject}
        originalList={originalList}
        employeelist={employeelist}
        inProject={false}
        employees={state.employees}
        addedNames={state.addedNames}
        errCount={errCount}
        handleEmployees={handleEmployees}
        handleChange={handleChange}
        projectsList={projectsList}
        handleCheck={handleCheck}
        handleDateChange={handleDateChange}
        clearValues={clearValues}
        handleCreate={handleCreate}
      />
  )
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    projectCreation: (payload) => {
      dispatch(projectCreation(payload))
    },
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
	  employeelist: state.firestore.ordered.employeelist,
	  names: state.firestore.ordered.names,
	}
  }

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((props) => {
    if(!props.employeelist)
    return [
      {
        collection: "EMPLOYEES",
        storeAs: "employeelist",
      },
    ]
    return []
  })
)(Container)



