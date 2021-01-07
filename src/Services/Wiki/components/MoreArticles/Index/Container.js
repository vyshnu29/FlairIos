import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Spinner from 'react-native-loading-spinner-overlay'
import Presentation from "./Presentation"

function Container(props) {
  const { categoryMetaInfo } = props

  const [state, setState] = useState({
    categories: [],
  })

  useEffect(() => {
    if (isLoaded(categoryMetaInfo) && !isEmpty(categoryMetaInfo)) {
      let metaInfo = categoryMetaInfo[0]
      const categories = []
      const predefinedCategoryNames = ["General", "Knowledge", "Archived"]

      categories[2] = {
        name: "Archived",
        id: "archived",
      }

      Object.entries(metaInfo.types).forEach(([key, value]) => {
        if (predefinedCategoryNames.includes(value)) {
          categories[predefinedCategoryNames.indexOf(value)] = {
            name: value,
            id: key,
          }
        } else {
          categories.push({
            name: value,
            id: key,
          })
        }
      })
      setState((state) => ({ ...state, categories }))
    }
  }, [categoryMetaInfo])

  return isLoaded(categoryMetaInfo) ? (
      <Presentation {...state} {...props} />
  ) : (
   <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const firestore = state.firestore.ordered
  return {
    categoryMetaInfo: firestore.categoryMetaInfo,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "ID_TRACKER",
        doc: "categories",
        storeAs: "categoryMetaInfo",
      },
    ]
  })
)(Container)
