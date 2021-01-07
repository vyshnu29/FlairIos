import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import {ActivityIndicator} from "react-native"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../middleware"

function Container(props) {
  const {
    recruitmentDetails_data,
    benchSalesList,
    placement,
    addSectionToPlacement,
    profile,
    updatePlacement,
  } = props

  const initState = {
    companyIDs: [],
    benchSalesList: [],
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
  }

  const [state, setState] = useState(initState)

  const callback = () => {}

  const handleEmployees = (value) => {
    setState({ ...state, companyIDs: value })
  }

  useEffect(() => {
    if (isLoaded(recruitmentDetails_data) && !isEmpty(recruitmentDetails_data)) {
      setState((prevState) => ({
        ...prevState,
        companyIDs: recruitmentDetails_data.companyIDs,
      }))
    } else setState(() => ({ ...initState }))
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
      benchSalesList,
    }))

    // return () => setState(() => ({ ...initState }))
  }, [recruitmentDetails_data, benchSalesList, placement])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.fillableSections.includes("recruitment_details")) {
      console.log("create")
      addSectionToPlacement(
        { companyIDs: state.companyIDs },
        "recruitment_details",
        state.employeeID,
        state.id,
        callback
      )
    } else {
      console.log("update")
      updatePlacement(
        { companyIDs: state.companyIDs },
        "recruitment_details",
        state.employeeID,
        state.id,
        callback
      )
    }
  }

  if (isLoaded(recruitmentDetails_data)) {
    return (
      <Presentation
        {...state}
        handleEmployees={handleEmployees}
        handleSubmit={handleSubmit}
      />
    )
  }

  return (
   <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    recruitmentDetails_data: state.firestore.data.recruitmentDetails_data,
    benchSalesList: Object.entries(state.firestore.data.names)
      .map(([key, value]) => {
        return {
          ...value,
        }
      })
      .filter(
        (item) =>
          (item.uid !== ownProps.profile.uid &&
            item.department === "Bench Sales") ||
          item.designation === "admin"
      ),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSectionToPlacement: (payload, sectionName, uid, placementID, callback) => {
      dispatch(addSectionToPlacement(payload, sectionName, uid, placementID, callback))
    },
    updatePlacement: (payload, sectionName, uid, placementID, callback) => {
      dispatch(updatePlacement(payload, sectionName, uid, placementID, callback))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { placement } = props
    if (!placement.id) return []
    return [
      {
        collection: "EMPLOYEES",
        doc: placement.employeeID,
        subcollections: [
          {
            collection: "PLACEMENTS",
            doc: placement.id,
            subcollections: [
              {
                collection: "SETTINGS",
                doc: "recruitment_details",
                storeAs: "recruitmentDetails",
              },
            ],
            storeAs: "placement_recruitmentDetails",
          },
        ],
        storeAs: "recruitmentDetails_data",
      },
    ]
  })
)(Container)
