import { JSutils } from "../../../../../shared/JSutils"
import firestore from '@react-native-firebase/firestore'
import RNFirebase from '@react-native-firebase/app';

const handler = (state, action) => {

  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.data }

    case "LOAD_TIMESHEETS": {
      async function fetch() {
        const condition = action.condition
        console.log(condition)
        const employeeID = action.employeeID
        if (employeeID === "") return state
        let timesheetsRef = RNFirebase.firestore().collection(`EMPLOYEES/${employeeID}/TIMESHEETS`).where("isExist", "==", true).orderBy("createdAt", "desc")
        if (action.isManager) {
          timesheetsRef = RNFirebase.firestore()
            .collectionGroup(`TIMESHEETS`)
            .orderBy("createdAt", "desc")
            .where("isExist", "==", true)
        }
        if (condition === "submittedTimesheets")
          timesheetsRef = timesheetsRef
            .where("isApproved", "==", false)
            .where("isRejected", "==", false)
            .where("isDefaulter", "==", false)
        else if (condition === "approvedTimesheets")
          timesheetsRef = timesheetsRef
            .where("isApproved", "==", true)
            .where("isRejected", "==", false)
            .where("isDefaulter", "==", false)
        else if (condition === "rejectedTimesheets")
          timesheetsRef = timesheetsRef
            .where("isApproved", "==", false)
            .where("isRejected", "==", true)
            .where("isDefaulter", "==", false)
        else if (condition === "defaulterTimesheets")
          timesheetsRef = timesheetsRef
            .where("isApproved", "==", false)
            .where("isRejected", "==", false)
            .where("isDefaulter", "==", true)

        const snap = await timesheetsRef.get()
        action.setState({
          ...state,
          isFetchingTimesheets: false,
          [condition]: snap.docs.map(doc => doc.data())
        })
      }

      fetch()
      return state
    }

    case "LOAD_SETTINGS": {
      const placementIDs = [...new Set(action.placementIDs)]
      const chunks = JSutils._array_to_chunk(placementIDs, 10)
      console.log(chunks);
      async function fetch() {
        const promises = []
        chunks.forEach(chunk => {
          const promise = RNFirebase.firestore()
            .collectionGroup("SETTINGS")
            .where("placementID", "in", chunk)
            .where("id", "==", "timesheets")
            .get()
          promises.push(promise)
        })
        const chunkSnap = await Promise.all(promises)
        console.log(chunkSnap);
        const data = chunkSnap.reduce((init, snap) => [...snap.docs.map(doc => doc.data()), ...init], [])
        console.log(data);
        const formatted = data.reduce((init, item) => {
          return {
            ...init,
            [item.placementID]: item
          }
        }, {})
        console.log(formatted)
        action.setState({
          timesheetSettings: formatted,
          isSettingsLoading: false
        })
      }
      if (placementIDs.length)
        fetch()
      else
        action.setState({
          isSettingsLoading: false
        })
      return state
    }

    default: return state
  }
}

export default handler