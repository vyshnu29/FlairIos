import React, { useEffect } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import { loadTask,loadTasksList,setState } from "../../../../middleware/tasks"
import { linkTasks } from "../../../../middleware"
import Spinner from "react-native-loading-spinner-overlay"


function Container(props) {
  const { taskData ,_load_task,_load_taskslist,isLoadingTask,tasksListData,isLoadingTaskList} = props
  

  const [state, setState] = React.useState({
    listOfTasksToBeLinked: [],
  })


  let task = []

 let tasksListPayload = {
   projectID: props.route.params.projectId,
  }
  
 let tasksList = []

   let taskPayload = {
     taskID: props.route.params.taskId,
     projectID: props.route.params.projectId,
  }
  

   useEffect(() => {
     _load_task(taskPayload)
     _load_taskslist(tasksListPayload)

   }, [])
  
  
  const handleChange = (e, value) => {
    let taskArray = state.listOfTasksToBeLinked
    if (e) {
      taskArray = [...taskArray, value]
    } else {
      const index = taskArray.indexOf(value)
      taskArray.splice(index, 1)
    }
    setState({
      ...state,
      listOfTasksToBeLinked: taskArray,
    })
  }



  const handleClick = (e) => {
    e.preventDefault()
    const { link_task } = props
    let data = {
      parentTaskId: props.route.params.taskId,
      tasksToBeLinked: state.listOfTasksToBeLinked,
      projectId: props.route.params.projectId,
    }
    let payload = {
      projectID: props.route.params.projectId,
      data,
    }
    console.log(payload)
    link_task(payload)
  }
  const clearValues = () => {
    setState({
      ...state,
      listOfTasksToBeLinked: "",
    })
  }
  if (isLoaded(props.project)) {
    if (!isLoadingTask && !isLoadingTaskList)  {
      task = Object.values(taskData["taskData"])
      tasksList = Object.values(tasksListData["tasksListData"].data)
      return (
          <Presentation
            {...props}
            listOfTasksToBeLinked={state.listOfTasksToBeLinked}
            task={task}
            taskList={tasksList}
            handleChange={handleChange}
            handleClick={handleClick}
            clearValues={clearValues}
          />
      )
    }
    return <Spinner visible={true} />
  }
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  const taskId = ownProps.route.params.taskId
  // const projectId = ownProps.projectId
  const project = state.firestore.ordered.project
  // ? state.firestore.ordered.project
  // : state.firestore.ordered.projectsList.filter(
  //     (item) => item.id === projectId
  //   )[0]

  return {
    project: project,
    taskData: state.projects.task,
    isLoadingTask: state.projects.task.taskData.isLoading,
    tasksListData: state.projects.tasksList,
    isLoadingTaskList: state.projects.tasksList.tasksListData.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    _load_task: (payload) => {
      dispatch(loadTask(payload))
    },
    _load_taskslist: (payload) => {
      dispatch(loadTasksList(payload))
    },
    link_task: (payload) => {
      dispatch(linkTasks(payload))
    },
    // _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.task || !props.project)
      return [
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          storeAs: "project",
        },
        {
          collection: "PROJECTS",
          doc: props.route.params.projectId,
          subcollections: [
            {
              collection: "TASKS",
              storeAs: "tasks",
            },
          ],
          storeAs: "taskslist",
        },
      ]
    return []
  })
)(Container)
