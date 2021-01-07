import React, { useState } from "react"
import { isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { editTasks } from "../../../../middleware"
import Spinner from 'react-native-loading-spinner-overlay'
function Container(props) {
  const [state, setState] = React.useState({
    task: props.task,
    title: props.task.title,
    type: props.task.type,
    status: props.task.status,
    startdate: props.task.startdate,
    enddate: props.task.enddate,
    priority: props.task.priority,
    labels: props.taskLabels,
    assignee: props.task.assignee,
    description: props.task.description,
    projectAssignee: [],
    setReminder: props.task.setReminder,
    reminderDate: props.task.reminderDate,
  })
  const [description, setDescription] = useState(props.task.description)
  const handleChange = (key, value) => {
    if (key === "setReminder" && value === true) {
      setState({
        ...state,
        status: "Closed",
        setReminder: true,
      })
    } else if (key === "setReminder" && value === false) {
      setState({
        ...state,
        status: "",
        setReminder: false,
      })
    } else if (key === "reminderDate" && !isNaN(Date.parse(value))) {
      setState({
        ...state,
        reminderDate: new Date(value).toISOString(),
      })
    } else if (key === "reminderDate" && isNaN(Date.parse(value))) {
      setState({
        ...state,
        reminderDate: "",
      })
    } else if (key !== "reminderDate")
      setState({
        ...state,
        [key]: value,
      })
  }
  const handleDescription = (key, value) => {
    setDescription({
      [key]: value,
    })
  }
  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value)))
      setState({
        ...state,
        [key]: value,
      })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const {
      title,
      type,
      status,
      startdate,
      enddate,
      priority,
      labels,
      assignee,
      setReminder,
      reminderDate,
    } = state
    const { editTasks } = props
    let data = {
      title,
      type,
      status,
      startdate: new Date(startdate).setHours(0, 0, 0, 0),
      enddate: new Date(enddate).setHours(0, 0, 0, 0),
      priority,
      labels,
      assignee,
      description: description ? Object.values(description)[0] : "",
      setReminder,
      reminderDate,
      taskId: props.task.id,
      projectId: props.project.id,
    }
    console.log(labels)
    editTasks(data)
  }
  // const clearState = (e) => {
  //   setState({
  //     ...state,
  //     title: "",
  //     type: "",
  //     status: "",
  //     startdate: "",
  //     enddate: "",
  //     priority: "",
  //     label: "",
  //     assignee: [],
  //     description: "",
  //     projectAssignee: [],
  //     isCreated: false,
  //     setReminder: false,
  //     reminderDate: "",
  //   })
  // }

  const handleDropdown = (e, value) => {
    let taskArray = state.assignee
    let taskArray1 = state.labels
    if (e) {
      taskArray = [...taskArray, value]
      taskArray1 = [...taskArray1, value]
    } else {
      const index = taskArray.indexOf(value)
      taskArray.splice(index, 1)
      const index1 = taskArray1.indexOf(value)
      taskArray1.splice(index1, 1)
    }
    setState({
      ...state,
      assignee: taskArray,
      labels:taskArray1
    })
  }

  if (isLoaded(props.task, props.project, props.labels, props.taskLabels))
    return (
        <Presentation
          {...props}
          // errCount={errCount}
          state={state}
          description={description}
          handleUpdate={handleUpdate}
          handleDateChange={handleDateChange}
          handleChange={handleChange}
          handleDropdown={handleDropdown}
          handleDescription={handleDescription}
        />
    )
  return <Spinner visible={true} />
}
const mapStateToProps = (state, ownProps) => {
  const task = ownProps.task
  const project = ownProps.project
  let assignees =
    project && Object.values(project.Users).map((user) => user.uid)
  let labels = Object.values(project.labels).filter((e) => e.isExist)

  let taskLabels = task.labels
    ? labels.filter((item) => task.labels.map((e) => e.id === item.id))
    : []
console.log(task)
  return {
    task: task,
    project: project,
    assignees: assignees,
    labels: labels,
    taskLabels: taskLabels,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editTasks: (payload) => {
      dispatch(editTasks(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container)
