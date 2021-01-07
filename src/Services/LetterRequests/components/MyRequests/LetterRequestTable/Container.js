import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import {
  loadAllRequestLetter,
  unSubscribeListener,
  loadPendingRequestLetter,
  loadRejectedRequestLetter,
  loadIssuedRequestLetter,
  setState,
} from "../../../middleware/letterRequest"

function Container(props) {
  const {
    state,
    condition,
    loggedInEmployee,
    myReq,
    _load_all_letter_requests,
    _load_pending_letter_requests,
    _load_rejected_letter_requests,
    _load_issued_letter_requests,
    _un_subscribe_listener,
    Stateletters,
    authorizedSignatures,
  } = props
  const tabPair = [
    "allLetterRequests",
    "pendingLetterRequests",
    "rejectedLetterRequests",
    "issuedLetterRequests",
  ]

  useEffect(() => {
    let employeeID = loggedInEmployee

    let payload = {
      employeeId: employeeID,
      myReq: myReq,
    }
    _un_subscribe_listener(tabPair[condition])
    switch (condition) {
      case 0:
        return _load_all_letter_requests(payload)

      case 1:
        return _load_pending_letter_requests(payload)

      case 2:
        return _load_rejected_letter_requests(payload)

      case 3:
        return _load_issued_letter_requests(payload)

      default:
        break
    }
  }, [condition])
    return  (
        <Presentation
          state={ state}
          {...props}
          reqLettersList={isLoaded(Stateletters) ? Stateletters : []}
          condition={condition}
          tabPair={tabPair}
          loggedInEmployee={loggedInEmployee}
          authorizedSignatures={authorizedSignatures}
        />
    
    )
 
}

const mapStateToProps = (state, ownProps) => {
  const tabPair = [
    "allLetterRequests",
    "pendingLetterRequests",
    "rejectedLetterRequests",
    "issuedLetterRequests",
  ]
  const { data, ordered } = state.firestore

  return {
    authorizedSignatures: ordered.authorizedSignatures,
    Stateletters: ordered.templates,
    loggedInEmployee: state.firebase.auth.uid,
    state: state.letterRequests.letterRequestsList,
    isLoadingstate:
      state.letterRequests.letterRequestsList[
        tabPair[ownProps.condition].isLoading
      ],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _load_all_letter_requests: (payload) =>
      dispatch(loadAllRequestLetter(payload)),
    _load_pending_letter_requests: (payload) =>
      dispatch(loadPendingRequestLetter(payload)),
    _load_rejected_letter_requests: (payload) =>
      dispatch(loadRejectedRequestLetter(payload)),
    _load_issued_letter_requests: (payload) =>
      dispatch(loadIssuedRequestLetter(payload)),
    _un_subscribe_listener: (type) => dispatch(unSubscribeListener(type)),
    _set_state: (obj) => setState(obj),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => {
    return [
      {
        collection: "LETTER_TEMPLATES",
        where: [["isExist", "==", true]],
        storeAs: "templates",
      },
      {
        collectionGroup: "SIGNATURES",
        where: [["isExist", "==", true]],
        storeAs: "authorizedSignatures",
      },
    ]
  })
)(Container)
