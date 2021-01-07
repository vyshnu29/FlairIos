import {ActivityIndicator,Alert} from 'react-native'
import React, { useEffect } from "react"
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../../../middleware"
import { firestoreConnect } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import { connect } from "react-redux"
import { isLoaded } from "react-redux-firebase"
import { loadTaskComments } from "../../../../middleware/tasks"
function Container(props) {
  const [state, setState] = React.useState({
    commentText: "",
    commenting: false,
    isEditing: false,
  })
  const handleChange = (data) => {
    setState({
      ...state,
      commentText: data,
    })
  }
  let comments = []
  const { commentsData, _load_task_comments, isLoadingTaskComments } = props

  let taskCommentsPayload = {
    projectID: props.projectId,
    taskID: props.taskId,
  }
  useEffect(() => {
    _load_task_comments(taskCommentsPayload)
  }, [])






  const [onEdits, setEdit] = React.useState(false)
  const [updateId, setId] = React.useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({
      ...state,
      commenting: true,
    })
    const { addComment } = props
    const newComment = {
      projectId: props.projectId,
      taskId: props.taskId,
      //createdBy: state.employee.email,
      text: state.commentText,
    }
    addComment(newComment)
    setState({
      ...state,
      commentText: "",
      commenting: false,
      isEditing: false,
    })
    setEdit({
      onEdit: false,
    })
    setId({
      updateId: "",
    })
    // dispatch({
    //   type: COMMENT,
    //   payload: newComment,
    //   response: this.response,
    // })
  }
  const stateSet = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }
  const handleEdit = (key, value) => {
    setState({
      ...state,
      isEditing: true,
      commentText: value.text,
      updateId: value.id,
    })
    setEdit({
      [key]: true,
    })
    setId({
      updateId: value.id,
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    const { updateComment } = props
    if (updateId.updateId) {
      setState({
        ...state,
        commenting: true,
      })
      const updatedComment = {
        projectId: props.projectId,
        // createdBy: state.employee.email,
        taskId: props.taskId,
        id: updateId.updateId,
        text: state.commentText,
      }
      updateComment(updatedComment)
      setState({
        ...state,
        commentText: "",
        commenting: false,
        isEditing: false,
      })
      setEdit({
        onEdit: false,
      })
      setId({
        updateId: "",
      })
      // dispatch({
      //   type: UPDATE_COMMENT,
      //   payload: updatedComment,
      //   response: response,
      // })
    }
  }
  const handleDelete = (id) => {
    const { deleteComment } = props
    
      // dispatch({
      //   type: DELETE_COMMENT,
      //   payload: {
      //     projectId: this.props.projectId,
      //     taskId: this.props.taskId,
      //     id: id,
      //   },
      // })
      let data = {
        projectId: props.projectId,
        taskId: props.taskId,
        id: id,
      }
      // Alert.alert(
      //   'Alert',
      //   'Are you sure you want to delete this?',
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel'
      //     },
      //     { text: 'OK', onPress: () => deleteComment(data) }
      //   ],
      //   { cancelable: false }
      // );
      deleteComment(data)
      setState({
        ...state,
        commentText: "",
        commenting: false,
        isEditing: false,
      })
      setEdit({
        onEdit: false,
      })
      setId({
        updateId: "",
      })
    
  }
  const handleCancel = () => {
    setState({
      ...state,
      commentText: "",
      commenting: false,
      isEditing: false,
    })
    setEdit({
      onEdit: false,
    })
    setId({
      updateId: "",
    })
  }

    if (!isLoadingTaskComments) {
      comments = Object.values(commentsData["taskCommentsData"].data)
        ? Object.values(commentsData["taskCommentsData"].data).filter(
            (i) => i.taskId === props.taskId
          )
        : Object.values(commentsData["taskCommentsData"].data)
      return (
     
          <Presentation
            {...props}
            state={state}
            comments={comments}
            projectId={props.projectId}
            taskId={props.taskId}
            onEdits={onEdits.onEdit}
            updateId={updateId}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            stateSet={stateSet}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          />
      )
    }
  return <ActivityIndicator/>
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addComment: (payload) => {
      dispatch(addComment(payload))
    },
    updateComment: (payload) => {
      dispatch(updateComment(payload))
    },
    deleteComment: (payload) => {
      dispatch(deleteComment(payload))
    },
    _load_task_comments: (payload) => {
      dispatch(loadTaskComments(payload))
    },
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // taskslist: state.firestore.ordered.taskslist,
    projectId: ownProps.projectId,
    taskId: ownProps.taskId,
    // comments: state.firestore.ordered.comments
    //   ? state.firestore.ordered.comments.filter(
    //       (i) => i.taskId === ownProps.taskId
    //     ).length
    //     ? state.firestore.ordered.comments.filter(
    //         (i) => i.taskId === ownProps.taskId
    //       )
    //     : undefined
    //   : state.firestore.ordered.comments,
    commentsData: state.projects.task,
    isLoadingTaskComments: state.projects.task.taskCommentsData.isLoading,
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.comments)
      return [
        {
          collection: "PROJECTS",
          doc: props.projectId,
          subcollections: [
            {
              collection: "TASKS",
              doc: props.taskId,
              subcollections: [
                {
                  collection: "TASK_COMMENTS",
                  where: ["isExist", "==", true],
                  storeAs: "comments",
                },
              ],
              storeAs: "comments",
            },
          ],
          storeAs: "comments",
        },
      ]
    return []
  })
)(Container)


  
  