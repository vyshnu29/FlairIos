import React, { useContext } from 'react'
import Presentation from "./Presentation"
import { Context } from "../component_state/context"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"

function Container(props) {
  const [state, handle] = useContext(Context)
  const [tabValue, setTabValue] = React.useState(0);
  const { trackTimesheetSubmissions } = props

  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // let pendingRanges = 0, approvedRanges = 0, defaulterRanges = 0, rejectedRanges = 0;
  // if (isLoaded(trackTimesheetSubmissions) && trackTimesheetSubmissions) {
  //   Object.values(trackTimesheetSubmissions).forEach(item => {
  //     console.log(item)
  //     if (typeof item === "object") {
  //       pendingRanges += "pendingRanges" in item ? item.pendingRanges.length : 0
  //       approvedRanges += "approvedRanges" in item ? item.approvedRanges.length : 0
  //       defaulterRanges += "defaulterRanges" in item ? item.defaulterRanges.length : 0
  //       rejectedRanges += "rejectedRanges" in item ? item.rejectedRanges.length : 0
  //     }
  //   })
  // }
  // console.log(pendingRanges, approvedRanges, defaulterRanges, rejectedRanges)
  return (
  
      <Presentation
        tabValue={tabValue}
        {...props}
        handleTabChange={handleTabChange}
        // pendingRanges={pendingRanges}
        // approvedRanges={approvedRanges}
        // defaulterRanges={defaulterRanges}
        // rejectedRanges={rejectedRanges}
      />
  
  )
}

const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    trackTimesheetSubmissions: state.firestore.data.trackTimesheetSubmissions
  }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) => {
  if (props.listAll && (props.modules.includes("timesheets-manager") || props.modules.includes("console-customization")))
    return [
      {
        collection: "META_INFO",
        doc: "timesheets",
        subcollections: [
          {
            collection: "TRACK_SUBMISSIONS",
            storeAs: "trackTimesheetSubmissions"
          }
        ],
        storeAs: "trackTimesheetSubmissions",
      },
    ]
  else if (props.modules.includes("timesheets") || props.listAll === false)
    return [
      {
        collection: "META_INFO",
        doc: "timesheets",
        subcollections: [
          {
            collection: "TRACK_SUBMISSIONS",
            where: ["employeeID", "==", props.listAll === false ? props.employeeID : props.loggedInEmployee],
            storeAs: "trackTimesheetSubmissions"
          }
        ],
        storeAs: "trackTimesheetSubmissions",
      },
    ]
  return []
}))(Container)