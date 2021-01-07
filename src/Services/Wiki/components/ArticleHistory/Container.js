import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Spinner from 'react-native-loading-spinner-overlay'
import Presentation from "./Presentation"

function Container(props) {
  const { articleId, categoryMetaInfo } = props
  const article_history = props[`history_${props.route.params.articleId}`]

  const [state, setState] = useState({
    history: [],
  })

  useEffect(() => {
    if (isLoaded(article_history))
      setState((state) => ({ ...state, history: article_history }))
  }, [article_history])

  return isLoaded(categoryMetaInfo) ? (

      <Presentation
      {...props}
        {...state}
        article_history={article_history}
        categoryMetaInfo={categoryMetaInfo[0].types}
      />
  ) : (
    <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  return {
    [`history_${ownProps.route.params.articleId}`]: firestore[
      `history_${ownProps.route.params.articleId}`
    ],
    categoryMetaInfo: firestore.categoryMetaInfo,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collectionGroup: "ARTICLE_HISTORY",
        where: [["wikiArticleId", "==", props.route.params.articleId]],
        orderBy: [["createdAt", "asc"]],
        storeAs: `history_${props.route.params.articleId}`,
      },
      {
        collection: "ID_TRACKER",
        doc: "categories",
        storeAs: "categoryMetaInfo",
      },
    ]
  })
)(Container)
