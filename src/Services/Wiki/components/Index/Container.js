import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import Spinner from 'react-native-loading-spinner-overlay'
//import { getPreDefinedArticles } from "../../middleware"

function Container(props) {
  const { recentlyAdded, archived, categoryMetaInfo, allArticles } = props

  const [state, setState] = useState({
    recentlyAdded: [],
    archived: [],
    general: [],
    knowledge: [],
    allArticles: [],
    isLoading: true,
    searchKeyWord: "new",
  })

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }))
  }

  useEffect(() => {
    if (isLoaded(recentlyAdded)) {
      setState((prevState) => ({ ...prevState, recentlyAdded }))
    }

    if (isLoaded(archived)) {
      setState((state) => ({ ...state, archived }))
    }

    if (isLoaded(allArticles)) {
      setState((state) => ({ ...state, allArticles }))
      if (isLoaded(categoryMetaInfo) && !isEmpty(categoryMetaInfo)) {
        let general_id, knowledge_id
        if (Object.keys(categoryMetaInfo[0]).length) {
          Object.entries(categoryMetaInfo[0].types).forEach(([key, value]) => {
            if (value === "General") general_id = key
            if (value === "Knowledge") knowledge_id = key
          })
        }
        setState((state) => {
          const general = allArticles
            .filter((item) => item.categoryId === general_id)
            .slice(0, 5)
          const knowledge = allArticles
            .filter((item) => item.categoryId === knowledge_id)
            .slice(0, 5)
          return {
            ...state,
            general,
            knowledge,
            isLoading: false,
          }
        })
      } else {
        setState((state) => ({ ...state, isLoading: false }))
      }
    }
  }, [categoryMetaInfo, allArticles, archived, recentlyAdded])

  if (!state.isLoading) {
    return (
        <Presentation
          {...state}
          {...props}
          handleChange={handleChange}
          access_modules={props.access_modules}
        />
    )
  }
  return (
    <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  return {
    recentlyAdded: firestore.recentlyAdded,
    archived: firestore.archived,
    categoryMetaInfo: firestore.categoryMetaInfo,
    allArticles: firestore.allArticles,
    access_modules: state.employee.employeeModules.accessModules,
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getPreDefinedArticles: (categoryMetaInfo) => {
//       dispatch(getPreDefinedArticles(categoryMetaInfo))
//     },
//   }
// }

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "WIKI",
        orderBy: [["createdAt", "desc"]],
        limit: 5,
        storeAs: "recentlyAdded",
      },
      {
        collection: "WIKI",
        where: [["isExist", "==", false]],
        orderBy: [["createdAt", "desc"]],
        limit: 5,
        storeAs: "archived",
      },
      {
        collection: "ID_TRACKER",
        doc: "categories",
        storeAs: "categoryMetaInfo",
      },
      {
        collection: "WIKI",
        orderBy: [["createdAt", "desc"]],
        where: [["isExist", "==", true]],
        storeAs: "allArticles",
      },
    ]
  })
)(Container)

