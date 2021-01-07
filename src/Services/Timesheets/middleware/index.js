import {
  errorMsg,
  waitingMsg,
  stopWaitMsg,
  successMsg,
} from "../../../shared/SnackBars/index"
import make_API_call from "../../../providers/REST_API"
import firestore from "@react-native-firebase/firestore"
import {
  loadPlacementSuccess,
  loadTimesheetSettingsSuccess,
  loadExistingTimesheetData,
  notifyDefaulterReq,
  notifyDefaulterSuccess,
  notifyDefaulterFailure
} from "../actions/actionCreators"
import {
  addDays,
  eachDayOfInterval
} from "date-fns";

export const submitTimesheet = (payload, employeeID, placementID, history) => (dispatch) => {
  waitingMsg("Submitting timesheet")
  return make_API_call("post", `/employees/${employeeID}/placements/${placementID}/timesheets/new`, payload)
    .then(res => {
      console.log(res)
      stopWaitMsg()
      history.push("/console/timesheets")
      return successMsg(res.message)
    }).catch(err => {
      console.log(err)
      stopWaitMsg()
      return errorMsg(err.message)
    })
}

export const updateTimesheet = (payload, employeeID, placementID, timesheetID, history) => (dispatch) => {
  waitingMsg("Processing...")
  return make_API_call("put", `/employees/${employeeID}/placements/${placementID}/timesheets/${timesheetID}/update`, payload)
    .then(res => {
      console.log(res)
      stopWaitMsg()
      history.push("/console/timesheets")
      return successMsg(res.message)
    }).catch(err => {
      console.log(err)
      stopWaitMsg()
      return errorMsg(err.message)
    })
}

export const approveTimesheet = (payload, employeeID, placementID, timesheetID) => (dispatch) => {
  waitingMsg("Approving timesheet")
  return make_API_call("put", `/employees/${employeeID}/placements/${placementID}/timesheets/${timesheetID}/approve`, payload)
    .then(res => {
      console.log(res)
      stopWaitMsg()
      return successMsg(res.message)
    }).catch(err => {
      console.log(err)
      stopWaitMsg()
      return errorMsg(err.message)
    })
}

export const rejectTimesheet = (payload, employeeID, placementID, timesheetID) => (dispatch) => {
  waitingMsg("Rejecting timesheet...")
  return make_API_call("put", `/employees/${employeeID}/placements/${placementID}/timesheets/${timesheetID}/reject`, payload)
    .then(res => {
      console.log(res)
      stopWaitMsg()
      return successMsg(res.message)
    }).catch(err => {
      console.log(err)
      stopWaitMsg()
      return errorMsg(err.message)
    })
}

export const loadEmployeePlacements = (employeeID) => {
  return firestore()
    .collection(`EMPLOYEES/${employeeID}/PLACEMENTS`).where("draft", "==", false)
    .where("isExist", "==", true)
    .get()
    .then(snap => {
      const placements = snap.docs.map(doc => doc.data())
      console.log(placements)
      return placements
    }).catch(err => {
      console.log(err)
    })
}

export const loadPlacement = (employeeID, placementID) => {
  return firestore()
    .collection(`EMPLOYEES/${employeeID}/PLACEMENTS`).doc(placementID)
    .get()
    .then(doc => {
      return doc.data()
    }).catch(err => {
      console.log(err)
    })
}

export const loadSettings = (employeeID, placementID) => {
  return firestore()
    .collection(`EMPLOYEES/${employeeID}/PLACEMENTS/${placementID}/SETTINGS`).doc("timesheets")
    .get()
    .then(doc => {
      return doc.data()
    }).catch(err => {
      console.log(err)
    })
}

export const loadTimesheet = (employeeID, timesheetID) => {
  return firestore()
    .collection(`EMPLOYEES/${employeeID}/TIMESHEETS`).doc(timesheetID)
    .get()
    .then(doc => {
      return doc.data()
    }).catch(err => {
      console.log(err)
    })
}

export const loadTimesheetSettings = (placementIDs) => (dispatch) => {
  return firestore()
    .collectionGroup("SETTINGS")
    .where("placementID", "in", placementIDs)
    .where("id", "==", "timesheets")
    .get()
    .then(snap => {
      const data = snap.docs.map(doc => doc.data())
      const formatted = data.reduce((init, item) => {
        return {
          ...init,
          [item.placementID]: {
            "settings": {
              "timesheets": item
            }
          }
        }
      }, {})
      console.log(formatted)
      dispatch(loadTimesheetSettingsSuccess(formatted))
    }).catch(err => {
      console.log(err)
    })
}

export const loadForEditOrView = (employeeID, placementID, timesheetID, setState) => (dispatch) => {
  return firestore()
    .collection(`EMPLOYEES/${employeeID}/PLACEMENTS`)
    .doc(placementID)
    .get()
    .then(doc => {
      dispatch(loadExistingTimesheetData({ placement: doc.data() }))
      return firestore().collection(`EMPLOYEES/${employeeID}/TIMESHEETS`).doc(timesheetID).get()
    }).then(doc => {
      const sheet = doc.data()
      const rangeDates = eachDayOfInterval({ start: sheet.startDate, end: sheet.endDate })
      setState({
        standardTime: sheet.workdetails.standardTime,
        OTtime: sheet.workdetails.OTtime,
        sourcePath: sheet.attachmentDetails.sourcePath,
        publicURL: sheet.attachmentDetails.publicURL,
        timesheetStartDate: sheet.startDate,
        timesheetEndDate: sheet.endDate,
        loadEntryTable: true,
        selectedRange: rangeDates
      })
      dispatch(loadExistingTimesheetData({ timesheet: doc.data() }))
    }).catch(err => {
      console.log(err)
    })
}

export const notifyDefaulter = (inputs, employeeID, timesheetID) => (dispatch, getState) => {
  dispatch(notifyDefaulterReq(timesheetID))
  const auth = getState().auth
  return make_API_call("post", "emails/open/send", inputs)
    .then(data => {
      successMsg(data.message)
      dispatch(notifyDefaulterSuccess(timesheetID))
      const log = {
        subject: {
          uid: employeeID,
        },
        actionBy: auth.uid,
        createdAt: new Date().toISOString(),
        type: "notifyDefaulter",
        eventDetails: {
          before: {},
          after: {}
        }
      }
      return make_API_call("post", "/logger/history", log)
    }).catch(err => {
      console.error(err);
      errorMsg(err.message)
      dispatch(notifyDefaulterFailure(timesheetID))
    })
}