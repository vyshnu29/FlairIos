import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { compose } from "redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import validate from "../../../../../../shared/validation"

function Container(props) {
  const {  placements_documents, placements_list } = props
  const {clientId} = props
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState([])

  useEffect(() => {

    if (isLoaded(placements_documents)) {
      console.log(placements_documents)
      const placementIDs = placements_list
        .filter((item) => item.clientId === clientId)
        .map((item) => item.placementID)
      console.log(placementIDs)
      const documents = placements_documents.filter((doc) =>
        placementIDs.includes(doc.placementID)
      )
      console.log(documents)
      const data = []
      documents.forEach((item) => {
        item.documents.forEach((doc) => {
          data.push({
            documentType: doc.documentType,
            status: doc.status,
            work_doc: doc.work_doc,
            effectiveDate: validate.dateFormatter(doc.effectiveDate),
            effectiveUntilDate: validate.dateFormatter(doc.effectiveUntilDate),
          })
        })
      })
      console.log(data)
      setData(data)
      setIsLoading(false)
    }
  }, [placements_documents, placements_list, clientId])

  return (
      <Presentation data={data} isLoading={isLoading} {...props}/>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { placements_documents, placements_list } = state.firestore.ordered
  return {
    placements_documents,
    placements_list,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const totalCollections = [
      {
        collectionGroup: "SETTINGS",
        where: [["id", "==", "documents"]],
        storeAs: "placements_documents",
      },
    ]

    const collections = totalCollections.filter((item) => !props[item.storeAs])

    console.log(collections)

    return collections
  })
)(Container)
