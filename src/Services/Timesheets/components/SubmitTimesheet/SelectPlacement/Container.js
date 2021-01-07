import React, { useEffect, useContext } from 'react'
import Presentation from "./Presentation"
import validation from "../../../../../shared/validation"
import Wrapper from "../../../../../shared/wrapper"
import { ContextProvider, Context } from "../component_state/context"
import { compose } from "redux"
import { connect } from "react-redux"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import { loadPlacement, loadSettings } from "../../../middleware"
import { useSelector } from "react-redux"


function Container(props) {
  const { placements } = props
  const [state, handle] = useContext(Context)
  const reduxTimesheetState = useSelector(reduxState => reduxState.timesheets.info.loadExistingTimesheetInfo)
  const setState = (obj) => {
    handle({
      type: "SET_STATE",
      data: obj
    })
  }

  useEffect(() => {
    setState({
      standardTime: [],
      OTtime: [],
      isSettingsLoaded: false,
      selectedRange: [],
      timesheetInfo: {
        startDate: "",
        endDate: "",
        attachmentDetails: {
          sourcePath: "",
          publicURL: "",
        },
      },
    })

    async function fetchSettings() {
      const settings = await loadSettings(state.employeeID, state.placementID)
      setState({
        timesheetSettings: settings,
        isSettingsLoaded: true
      })
    }
    if (state.placementID) {
      fetchSettings()
    }

  }, [state.placementID])

  return (
    <div>
      <Presentation
        setState={setState}
        state={state}
        placements={state.type === "new" ? placements : [reduxTimesheetState.placement]}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInEmployee: state.firebase.auth.uid
  }
}

export default connect(mapStateToProps)(Container)
