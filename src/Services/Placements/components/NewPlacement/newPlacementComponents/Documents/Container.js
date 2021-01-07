
import {ActivityIndicator,View,Text} from 'react-native'
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import validate from "../../../../../../shared/validation"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"


function Container(props) {
  const {
    documents_data,
   
  } = props



  
  

  


  if (isLoaded(documents_data)) {
    return (
      <Presentation
       
       {...props}
       documents={documents_data.documents}
        
        
      />
    )
  }

  return (
   <View>
     <Text>No data</Text>
   </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents_data: state.firestore.data.documents_data,
    req_client: state.firestore.data.clients_list[ownProps.placement.clientId],
  }
}



export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    const { placement } = props
    if (!placement.id) return []
    return [
      {
        collection: "EMPLOYEES",
        doc: placement.employeeID,
        subcollections: [
          {
            collection: "PLACEMENTS",
            doc: placement.id,
            subcollections: [
              {
                collection: "SETTINGS",
                doc: "documents",
                storeAs: "document",
              },
            ],
            storeAs: "placement_document",
          },
        ],
        storeAs: "documents_data",
      },
    ]
  })
)(Container)
