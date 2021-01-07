import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"

function Container(props) {
  const { categoryName, categoryId } = props
  const category_articles = props[`${categoryName}_articles`]

  const [state, setState] = useState({
    articles: [],
  })

  useEffect(() => {
    if (isLoaded(category_articles)) {
      setState((state) => ({ ...state, articles: category_articles }))
    }
  }, [categoryName, categoryId, category_articles])

  return (
 
      <Presentation {...state} category_articles={category_articles} {...props}/>
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  const { categoryName } = ownProps
  return {
    [`${categoryName}_articles`]: firestore[`${categoryName}_articles`],
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const { categoryId, categoryName } = props
    if (categoryId !== "archived")
      return [
        {
          collection: "WIKI",
          orderBy: [["createdAt", "desc"]],
          where: [
            ["categoryId", "==", categoryId],
            ["isExist", "==", true],
          ],
          storeAs: `${categoryName}_articles`,
        },
      ]
    
    return [
      {
        collection: "WIKI",
        orderBy: [["createdAt", "desc"]],
        where: [["isExist", "==", false]],
        storeAs: `${categoryName}_articles`,
      },
    ]
  })
)(Container)

