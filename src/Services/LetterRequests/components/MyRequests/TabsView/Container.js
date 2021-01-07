import React, { useContext, useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import validation from "../../../../../shared/validation"

function Container(props) {
  
  const { trackLetterRequestsSubmissions } = props

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }


  return (
 
      <Presentation
        {...props}
      
       
        trackLetterRequestsSubmissions={
          trackLetterRequestsSubmissions
            ? trackLetterRequestsSubmissions
            : { open: 0, void: 0, paid: 0 }
        }
      />
   
  )
}

const mapStateToProps = (state) => {
  return {
    trackLetterRequestsSubmissions:
      state.firestore.data.trackLetterRequestsSubmissions,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "ID_TRACKER",
        doc: "letter_requests",
        storeAs: "trackLetterRequestsSubmissions",
      },
    ]
    return []
  })
)(Container)
