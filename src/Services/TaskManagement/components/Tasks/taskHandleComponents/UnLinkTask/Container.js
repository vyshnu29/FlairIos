import React, { useEffect } from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from "react-redux"
import { loadTask ,setState} from "../../../../middleware/tasks"
import { unLinkTasks } from "../../../../middleware"

function Container(props) {

  const { taskData, _load_task, isLoadingTask } = props


  const [state, setState] = React.useState({
    listOfTasksToBeUnLinked: [],
  })

   let task = []

   let taskPayload = {
     taskID: props.route.params.taskId,
     projectID: props.route.params.projectId,
   }

   useEffect(() => {
     _load_task(taskPayload)
   }, [])

  const handleChange = (e, value) => {
    let taskArray = state.listOfTasksToBeUnLinked
    if (e) {
      taskArray = [...taskArray, value]
    } else {
      const index = taskArray.indexOf(value)
      taskArray.splice(index, 1)
    }
    setState({
      ...state,
      listOfTasksToBeUnLinked: taskArray,
    })
  }
  const handleClick = (e) => {
    e.preventDefault()
     const { unlink_task } = props
     let data = {
       tasksToBeUnlinked: state.listOfTasksToBeUnLinked,
       projectId: props.route.params.projectId,
     }
     let payload = {
       projectID: props.route.params.projectId,
       data,
     }
     console.log(payload)
     unlink_task(payload)
    // dispatch({
    //   type: UNLINK_TASKS,
    //   payload: {
    //     tasksToBeUnlinked: state.listOfTasksToBeUnLinked,
    //     projectId: state.project.id,
    //   },
    // })
  }
  const clearValues = () => {
    setState({
      ...state,
      listOfTasksToBeUnLinked: "",
    })
  }
  if (isLoaded(props.project)) {
    if (!isLoadingTask) {
      task = Object.values(taskData["taskData"])
      return (
          <Presentation
            {...props}
            listOfTasksToBeUnLinked={state.listOfTasksToBeUnLinked}
            task={task}
            handleChange={handleChange}
            handleClick={handleClick}
            clearValues={clearValues}
          />
      )
    }
    else
      return <Spinner visible={true} />
  }
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  const taskId = ownProps.route.params.taskId.taskId
  // const projectId = ownprops.route.params.projectId
  const tasksList = state.firestore.ordered.taskslist
  const project = state.firestore.ordered.project
  // ? state.firestore.ordered.project
  // : state.firestore.ordered.projectsList.filter(
  //     (item) => item.id === projectId
  //   )[0]

  return {
    taskData: state.projects.task,
    isLoadingTask: state.projects.task.taskData.isLoading,
    project: project,
    taskList: tasksList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_task: (payload) => {
      dispatch(loadTask(payload))
    },
    unlink_task: (payload) => {
      dispatch(unLinkTasks(payload))
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
