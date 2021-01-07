import React, { useEffect, useContext, useState } from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { Context } from "../component_state/context"
import {
  addDays,
  eachDayOfInterval
} from "date-fns";
import { utils, handleTableChange } from "../component_state/utils"
import { useSelector } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { compose } from "redux"

function Container(props) {
  const { settings, placement, submittedTimesheets } = props
  const [state, handle] = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  const handleDateSelection = (date, modifiers = {}) => {
    if (modifiers.disabled)
      return
    setSelectedDate(date)
  }

  const handleDateChange = () => {
    const placementInfo = state.placements[state.placementID]
    const existOrNot = state.dateRanges.some(range => {
      const selectionStart = new Date(selectedDate).setHours(0, 0, 0, 0)
      if (new Date(range.startDate).setHours(0, 0, 0, 0) <= new Date(selectionStart) && new Date(range.endDate).setHours(0, 0, 0, 0) >= new Date(selectionStart)) {
        const rangeDates = eachDayOfInterval({ start: range.startDate, end: range.endDate })

        const info = handleTableChange(
          new Date(range.startDate).setHours(0, 0, 0, 0),
          new Date(range.endDate).setHours(0, 0, 0, 0),
          placementInfo.startDate,
          placementInfo.endDate
        );
        let isAlreadySubmitted = false;
        const submitted = submittedTimesheets.map(item => item.split("_")[1] + "_" + item.split("_")[2])
        console.log(submitted, `${info.startDate}_${info.endDate}`)
        if (submitted.includes(`${info.startDate}_${info.endDate}`)) {
          isAlreadySubmitted = true
        }
        setState({
          selectedRange: rangeDates,
          standardTime: info.standardTime,
          OTtime: info.OTArr,
          timesheetInfo: {
            ...state.timesheetInfo,
            startDate: info.startDate,
            endDate: info.endDate
          },
          isAlreadySubmitted: isAlreadySubmitted
        })
        return true
      }
      return false
    })
    console.log(existOrNot)
    if (!existOrNot) {
      setState({
        selectedRange: [selectedDate],
        standardTime: [],
        OTtime: [],
        timesheetInfo: {
          ...state.timesheetInfo,
          startDate: "",
          endDate: ""
        },
        isAlreadySubmitted: false
      })
      handleTableChange(
        '',
        ''
      );
    }

  }

  const formDateRanges = () => {
    const placementInfo = state.placements[state.placementID]
    const cycles = state.timesheetSettings.cycle
    const allTimesheetDates = []
    console.log(placementInfo)
    const placementStartDate = new Date(placementInfo.startDate)
    const placementEndDate = new Date(placementInfo.endDate)
    const limit = new Date() > new Date(placementEndDate) ? new Date(placementEndDate) : new Date()
    let i = 0, cycleVisitedFlag = false
    let { date, range, startDay } = cycles[i]
    let start = new Date(placementStartDate).setHours(0, 0, 0, 0)
    console.log(start, new Date(limit).setHours(0, 0, 0, 0), start < new Date(limit).setHours(0, 0, 0, 0))
    while (start < new Date(limit).setHours(0, 0, 0, 0)) {
      let end;
      if (!cycleVisitedFlag) {
        end = addDays(start, utils().getDateRangeByDay(start, startDay, range)).setHours(0, 0, 0, 0)
        cycleVisitedFlag = true
      } else {
        end = utils().getRangeEndDate(start, range).setHours(0, 0, 0, 0)
      }
      if (end < new Date()) {
        allTimesheetDates.push({
          startDate: start,
          endDate: end
        })
      }
      start = addDays(end, 1).setHours(0, 0, 0, 0)
    }
    setState({
      dateRanges: allTimesheetDates
    })
    console.log(allTimesheetDates.map(item => {
      return {
        start: new Date(item.startDate),
        end: new Date(item.endDate)
      }
    }))

  }

  useEffect(() => {
    if (state.isSettingsLoaded) {
      formDateRanges()
    }
  }, [state.isSettingsLoaded])

  useEffect(() => {
    handleDateChange()
  }, [selectedDate])

  console.log(state)
  return (
    <div>
      <Presentation
        state={state}
        handleDateSelection={handleDateSelection}
        placement={state.placements[state.placementID]}
      />
    </div>
  )
}

const mapStateToProps = (reduxState, ownProps) => {
  const trackTimesheetSubmissions = reduxState.firestore.data.trackTimesheetSubmissions
  return {
    loggedInEmployee: reduxState.firebase.auth.uid,
    submittedTimesheets: trackTimesheetSubmissions ? ownProps.placementID in trackTimesheetSubmissions ? Array.isArray(trackTimesheetSubmissions[ownProps.placementID].submittedRanges) ? trackTimesheetSubmissions[ownProps.placementID].submittedRanges : [] : [] : []
  }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) => {
  return [
    {
      collection: "META_INFO",
      doc: "timesheets",
      subcollections: [
        {
          collection: "TRACK_SUBMISSIONS",
          where: [["id", "==", props.placementID]]
        }
      ],
      storeAs: "trackTimesheetSubmissions",
    },
  ]
}))(Container)
