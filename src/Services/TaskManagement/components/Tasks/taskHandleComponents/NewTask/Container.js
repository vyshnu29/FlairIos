import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import Spinner from 'react-native-loading-spinner-overlay'
import { createTasks, createsubTasks } from "../../../../middleware"
function Container(props) {
  console.log(props)
  const [state, setState] = React.useState({
    name: "",
    type: undefined,
    status: undefined,
    startdate: "",
    enddate: "",
    priority: undefined,
    labels: [],
    assignee: [],
    projectAssignee: [],
    isCreated: false,
    setReminder: false,
    reminderDate: "",
  })
  const [description, setDescription] = React.useState("")
  const handleChange = (key, value) => {
    console.log(key, value)
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
  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value)))
      setState({
        ...state,
        [key]: new Date(value).toISOString()
      })
  }
  // const isCreated = (bool) => {
  //   if (bool)
  //     setState({
  //       ...state,
  //       isCreated: true,
  //     })
  // }
  const handleDescription = (key, value) => {
    setDescription({
      [key]: value,
    })
  }

  const handleDropdown1  = (e, value) => {
    let taskArray1 = state.labels
    if (e) {
      taskArray1 = [...taskArray1, value]
    } else {
      const index1 = taskArray1.indexOf(value)
      taskArray1.splice(index1, 1)
    }
    setState({
      ...state,
      labels:taskArray1
    })
    }
  const handleDropdown  = (e, value) => {
    let taskArray = state.assignee
    if (e) {
      taskArray = [...taskArray, value]
    } else {
      const index = taskArray.indexOf(value)
      taskArray.splice(index, 1)
    }
    setState({
      ...state,
      assignee: taskArray,
    })
    }

  const clearValues = () => {
    setState({
      ...state,
      name: "",
      type: "",
      status: "",
      startdate: "",
      enddate: "",
      priority: "",
      labels: [],
      assignee: [],
      description: "",
      projectAssignee: [],
      isCreated: false,
    })
  }
  const handleCreate = (e) => {
    e.preventDefault()
    const { createTasks, createSubTasks } = props
    const {
      name,
      type,
      status,
      startdate,
      enddate,
      priority,
      assignee,
      labels,
      setReminder,
      reminderDate,
    } = state
    let id = props.route.params.projectId
    let data = {
      title: name,
      type,
      status,
      startdate,
      enddate,
      priority,
      assignee,
      description: description ? Object.values(description)[0] : "",
      labels,
      setReminder,
      reminderDate,
      category: props.route.params.category,
      id,
    }
    console.log(data)
    if (props.route.params.category === "task") {
      props.navigation.goBack();
      createTasks(data)
    }
    if (props.route.params.category === "subtask") {
      let data = {
        title: name,
        type,
        status,
        startdate,
        enddate,
        priority,
        assignee,
        description: description ? Object.values(description)[0] : "",
        labels,
        setReminder,
        reminderDate,
        category: props.route.params.category,
        id,
        taskId: props.route.params.taskId,
      }
      props.navigation.goBack();
      createSubTasks(data)
      // dispatch({
      //   type: NEW_SUB_TASK,
      //   payload: {
      //     data: {
      //       title: name,
      //       type,
      //       status,
      //       startdate,
      //       enddate,
      //       priority,
      //       labels,
      //       assignee,
      //       description,
      //       createdBy: state.employee.email,
      //       projectId: this.props.projectId,
      //       taskId: this.props.taskId,
      //       setReminder: false,
      //       reminderDate: "",
      //     },
      //     isCreated: this.isCreated,
      //   },
      // })
    }

    clearValues()
  }
  if (isLoaded(props.project))
    return (
        <Presentation
          {...props}
          text={props.route.params.text}
          state={state}
          description={description}
          assignee={state.assignee}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleCreate={handleCreate}
          handleDropdown1={handleDropdown1}
          handleDropdown={handleDropdown}
          clearValues={clearValues}
          handleDescription={handleDescription}
        />
    )
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.route.params.projectId,
    project: state.firestore.ordered.project
      ? state.firestore.ordered.project[0]
      : state.firestore.ordered.projectsList.filter(
          (project) => project.id === ownProps.route.params.projectId
        )[0],
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTasks: (payload) => {
      dispatch(createTasks(payload))
    },
    createSubTasks: (payload) => {
      dispatch(createsubTasks(payload))
    },
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.project)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          storeAs: "project",
        },
      ]
    return []
  })
)(Container)
