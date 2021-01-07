import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import {
  deleteArticle,
  restoreArticle,
  followOrUnfollow,
  voteForArticle,
} from "../../middleware"
import Spinner from 'react-native-loading-spinner-overlay'

function Container(props) {
  const {
    selectedArticle,
    selectedHistory,
    categoryMetaInfo,
  } = props

  const [state, setState] = useState({
    data: {},
  })

  useEffect(() => {
    let data = {}
    if (props.route.params.isHistory) {
      if (isLoaded(selectedHistory)) {
        data = selectedHistory[0].eventDetails.after
      }
    } else {
      if (isLoaded(selectedArticle)) {
        data = selectedArticle[0]
      }
    }
    setState((state) => ({ ...state, data }))
  }, [selectedArticle, selectedHistory, props.route.params.isHistory, categoryMetaInfo])

  if (
    isLoaded(state.data) &&
    !isEmpty(state.data) &&
    isLoaded(categoryMetaInfo)
  ) {
    return (
      <Presentation
        {...state}
        categoryMetaInfo={categoryMetaInfo[0]}
        isHistory={props.route.params.isHistory}
        articleId={props.route.params.articleId}
        onDeleteArticle={props.onDeleteArticle}
        onRestoreArticle={props.onRestoreArticle}
        onFollowOrUnfollow={props.onFollowOrUnfollow}
        auth={props.auth}
        {...props}
        OnVote={props.OnVote}
        access_modules={props.access_modules}
      />
    )
  }
  return <Spinner visible={true} />
}

const mapStateToProps = (state, ownProps) => {
  // console.error(state.firestore.errors.byQuery.selectedArticle)
  const firestore = state.firestore.ordered
  return {
    selectedArticle: firestore.selectedArticle,
    selectedHistory: firestore.selectedHistory,
    categoryMetaInfo: firestore.categoryMetaInfo,
    auth: state.firebase.auth,
    access_modules: state.employee.employeeModules.accessModules,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteArticle: (articleId) => {
      dispatch(deleteArticle(articleId))
    },
    onRestoreArticle: (articleId, categoryId) => {
      dispatch(restoreArticle(articleId, categoryId))
    },
    onRevertArticle: (payload, articleId, categoryId) => {
      dispatch(revertArticle(payload, articleId, categoryId))
    },
    onFollowOrUnfollow: (articleId, type) => {
      dispatch(followOrUnfollow(articleId, type))
    },
    OnVote: (articleId, type) => {
      dispatch(voteForArticle(articleId, type))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { articleId, isHistory, historyId } = props.route.params
    const collections = [
      {
        collection: "WIKI",
        where: [["id", "==", articleId]],
        storeAs: "selectedArticle",
      },
      {
        collectionGroup: "ARTICLE_HISTORY",
        where: [["id", "==", historyId]],
        storeAs: "selectedHistory",
      },
      {
        collection: "ID_TRACKER",
        doc: "categories",
        storeAs: "categoryMetaInfo",
      },
    ]
    if (isHistory) return [collections[1], collections[2]]
    return [collections[0], collections[2]]
  })
)(Container)
