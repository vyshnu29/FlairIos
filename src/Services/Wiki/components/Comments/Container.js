import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {Alert} from 'react-native'
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {ActivityIndicator} from 'react-native'
import Presentation from "./Presentation"
import { newComment, updateComment, deleteComment } from "../../middleware"

function Container(props) {
  const { onAdd, onDelete, onUpdate, articleId, names, auth } = props

  const article_comments = props[`comment_${articleId}`]

  const [state, setState] = useState({
    commentText: "",
    commenting: false,
    isEditing: false,
    updateId: "",
  })

  useEffect(() => {}, [article_comments])

  const clearState = () => {
    setState({
      commentText: "",
      commenting: false,
      updateId: "",
      isEditing: false,
    })
  }

  const handleChange = (key, value) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      }
    })
  }

  const callback = () => {
    clearState()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, commenting: true })
    onAdd({ content: state.commentText }, articleId, callback)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (state.updateId) {
      setState({ ...state, commenting: true })
      onUpdate(
        { content: state.commentText },
        articleId,
        state.updateId,
        callback
      )
    }
  }

  const handleDelete = (id) => {
    Alert.alert(
        'Alert',
        'Are you sure you want to delete this?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => onDelete(articleId, id, callback) }
        ],
        { cancelable: false }
      );
  }

  if(isLoaded(article_comments))
  {
    return (
        <Presentation
          {...state}
          names={names}
          auth={auth}
          comments={article_comments}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ) 
  }
  else {
    return (
    <ActivityIndicator size={30} style={{top:20}} color="#2970ff" />
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const { articleId } = ownProps
  //console.error(state.firestore.errors.byQuery[`comment_${articleId}`])
  const firestore = state.firestore.ordered
  return {
    [`comment_${articleId}`]: firestore[`comment_${articleId}`],
    names: state.firestore.data.names,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAdd: (payload, articleId, callback) => {
      dispatch(newComment(payload, articleId, callback))
    },
    onUpdate: (payload, articleId, commentId, callback) => {
      dispatch(updateComment(payload, articleId, commentId, callback))
    },
    onDelete: (articleId, commentId, callback) => {
      dispatch(deleteComment(articleId, commentId, callback))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { articleId } = props
    return [
      {
        collectionGroup: "ARTICLE_COMMENTS",
        where: [
          ["articleId", "==", articleId],
          ["isExist", "==", true],
        ],
        orderBy: [["createdAt", "desc"]],
        storeAs: `comment_${articleId}`,
      },
    ]
  })
)(Container)
