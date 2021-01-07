import React, { useContext, useEffect } from "react"
import Presentation from "./Presentation"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"
import validation from "../../../../../shared/validation"
import { ActivityIndicator } from "react-native"


function Container(props) {
  const { modules, loggedInEmployee, expensesCount } = props

  // let pendingRanges = 0, approvedRanges = 0, defaulterRanges = 0, rejectedRanges = 0;
  // let myCount = 0;
  // if (isLoaded(expensesCount) && expensesCount) {
  //   Object.values(expensesCount).forEach(item => {
  //     console.log(item)
  //     const pendings = "pendingRanges" in item ? item.pendingRanges.length : 0
  //     const approved = "approvedRanges" in item ? item.approvedRanges.length : 0
  //     const rejected = "rejectedRanges" in item ? item.rejectedRanges.length : 0
  //     if (typeof item === "object") {
  //       pendingRanges += pendings
  //       approvedRanges += approved
  //       rejectedRanges += rejected
  //     }
  //     if (item.employeeID === loggedInEmployee)
  //       myCount = pendings + approved + rejected
  //   })
  // }
  // console.log("Ss",props)
  
  return (
      <Presentation
        {...props}
        // pendingRanges={pendingRanges}
        // approvedRanges={approvedRanges}
        // rejectedRanges={rejectedRanges}
       // myCount={myCount}
        modules={modules}
      />
   //   <ActivityIndicator/>
  )
}

// const mapStateToProps = (state) => {
//     return {

//     }
// }
const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    expensesCount: state.firestore.data.expensesCount
  }
}

export default connect(mapStateToProps, null)(Container)
// export default compose(connect(mapStateToProps), firestoreConnect((props) => {
//   if (props.listAll && (props.modules.includes("timesheets-manager") || props.modules.includes("console-customization")))
//     return [
//       {
//         collection: "ID_TRACKER",
//         doc: "expenses",
//         subcollections: [
//           {
//             collection: "TRACK_SUBMISSIONS",
//             storeAs: "expensesCount"
//           }
//         ],
//         storeAs: "expensesCount",
//       },
//     ]
//   else if (props.modules.includes("timesheets") || props.listAll === false)
//     return [
//       {
//         collection: "ID_TRACKER",
//         doc: "exoenses",
//         subcollections: [
//           {
//             collection: "TRACK_SUBMISSIONS",
//             where: ["employeeID", "==", props.listAll === false ? props.employeeID : props.loggedInEmployee],
//             storeAs: "expensesCount"
//           }
//         ],
//         storeAs: "expensesCount",
//       },
//     ]
//   return []
// }))(Container)
