import React, { useEffect, useContext } from 'react'
import Presentation from "./Presentation"
import Wrapper from "../../../../../shared/wrapper"
import { ContextProvider, Context } from "../component_state/context"
import { connect } from "react-redux"
import validation from "../../../../../shared/validation"
import { loadEmployeePlacements, loadPlacement, loadTimesheet } from "../../../middleware"
import {
  eachDayOfInterval
} from "date-fns";

function Container(props) {
  const [state, handle] = useContext(Context)
  const { load_for_edit_or_view, loggedInEmployee } = props

  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }
  useEffect(() => {
    const timesheetID = validation.getQueryParameter("timesheetID")
    const placementID = validation.getQueryParameter("placementID")
    const employeeID = validation.getQueryParameter("employeeID")
    const type = props.match.params.type
    setState({
      type: type,
      timesheetID,
      placementID,
      employeeID,
      isSubmitting: false
    })

    async function fetchEmployeePlacements() {
      let placements = await loadEmployeePlacements(loggedInEmployee)
      const obj = {}
      placements.forEach(item => {
        obj[item.id] = item
      })
      setState({
        placements: obj,
        employeeID: loggedInEmployee,
        isPlacementsLoaded: true
      })
    }

    async function fetchPlacement() {
      const placement = await loadPlacement(employeeID, placementID)
      setState({
        placements: { [placement.id]: placement },
        isPlacementsLoaded: true
      })
    }

    async function fetchTimesheet() {
      const timesheet = await loadTimesheet(employeeID, timesheetID)
      const rangeDates = eachDayOfInterval({ start: new Date(timesheet.startDate), end: new Date(timesheet.endDate) })
      console.log(rangeDates)
      setState({
        standardTime: timesheet.workdetails.standardTime,
        OTtime: timesheet.workdetails.OTtime,
        selectedRange: rangeDates,
        timesheetInfo: {
          startDate: timesheet.startDate,
          endDate: timesheet.endDate,
          attachmentDetails: timesheet.attachmentDetails,
        },
      })
    }
    if (type === "new") {
      fetchEmployeePlacements()
    } else {
      fetchPlacement()
      fetchTimesheet()
    }
  }, [])
  console.log(state)
  // if (props.match.params.type === "edit")
  //   return "Edit timesheet is still under working progress"
  return (
    <div>
      <Presentation placementID={state.placementID} {...props} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInEmployee: state.firebase.auth.uid,
  }
}


export default connect(mapStateToProps)(Wrapper(ContextProvider, Container))
