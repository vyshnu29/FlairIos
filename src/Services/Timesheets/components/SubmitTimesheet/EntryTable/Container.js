import React, { useContext, useEffect, useState } from 'react'
import Presentation from "./Presentation"
import { Context } from "../component_state/context"
import { useSelector } from "react-redux"

function Container() {
  const [state, handle] = useContext(Context);
  const placements = useSelector((reduxState) => {
    if (state.type === "new") {
      const data = reduxState.firestore.data
      if ("myPlacements" in data)
        return data.myPlacements
      return {}
    }
    const placementInfo = reduxState.timesheets.info.loadExistingTimesheetInfo.placement
    if (Object.keys(placementInfo).length) {
      return {
        [placementInfo.id]: placementInfo
      }
    }
    return {}
  })
  console.log(placements)
  const [placement, setPlacement] = useState({})



  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  useEffect(() => {
    console.log(state.standardTime)
    if (state.standardTime.length)
      setState({
        loadEntryTable: true
      })
  }, [state.standardTime.length])

  const handleTime = (type, index, value) => {
    if (type === "standard") {
      const arr = state.standardTime
      arr[index].value = value
      setState({ standardTime: arr })
    } else if (type === "ot") {
      const arr = state.OTtime
      arr[index].value = value
      setState({ OTtime: arr })
    }
  }

  return (
    <div>
      <Presentation
        state={state}
        placement={placement}
        handleTime={handleTime}
      />
    </div>
  )
}

export default Container
