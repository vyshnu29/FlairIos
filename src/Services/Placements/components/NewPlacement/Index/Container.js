import React, { useEffect } from "react"
import { connect } from "react-redux"
import Presentation from "./Presentation"
import { getAllModules } from "../../../../EmployeeManagment/middleware"
import { compose } from "redux"
import { firestoreConnect, isLoaded as isLoad } from "react-redux-firebase"
import { getCountries } from "../../../../../shared/middleware"
import Spinner from 'react-native-loading-spinner-overlay'

function Container(props) {
  const {
    getAllModules,
    allModules,
    isEmpty,
    isLoaded,
    profile,
    isEdit,
    placement,
    id,
    clients,
    projectsList,
    isLoaded_countries,
    getCountries,
    isLoaded_allModules,
    loggedInEmployee,
  } = props

  useEffect(() => {
    if (id === loggedInEmployee) props.history.push(`/console/employees/${id}`)
  }, [id, loggedInEmployee])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAllModules()
    getCountries()
  }, [])

  if (
    isLoaded &&
    isLoad(placement) &&
    isLoad(clients) &&
    isLoad(projectsList) &&
    isLoaded_countries &&
    isLoaded_allModules
  ) {
    return (
   
        <Presentation
          allModules={allModules}
          profile={profile}
          isEdit={isEdit}
          placement={placement[0]}
          id={id}
          {...props}
        />
      
    )
  }
  return (
   <Spinner visible={true} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { allModules, isLoaded, isEmpty } = state.employee.employeeModules
  const shared = state.shared.geoInfo.countries
  const firestore = state.firestore.ordered
  return {
    allModules,
    isLoaded,
    isEmpty,
    profile: firestore.names[0][ownProps.id],
    placement:
      Array.isArray(firestore.placement) && firestore.placement.length
        ? firestore.placement
        : new_placement,
    projectsList: firestore.projectsList,
    clients: firestore.clients_list,
    isLoaded_countries: shared.isLoaded,
    isLoaded_allModules: state.employee.employeeModules.isLoaded,
    loggedInEmployee: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllModules: () => {
      dispatch(getAllModules())
    },
    getCountries: () => {
      dispatch(getCountries())
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const totalCollections = [
      {
        collection: "CLIENTS",
        where: [["isExist", "==", true]],
        storeAs: "clients_list",
      },
      {
        collection: "PROJECTS",
        storeAs: "projectsList",
      },
    ]
    if (!props.docId)
      return [
        ...totalCollections,
        {
          collectionGroup: "PLACEMENTS",
          where: [
            ["employeeID", "==", props.id],
            ["draft", "==", true],
            ["isExist", "==", true],
          ],
          storeAs: "placement",
        },
      ]
    if (props.docId) {
      return [
        ...totalCollections,
        {
          collectionGroup: "PLACEMENTS",
          where: [["id", "==", props.docId]],
          storeAs: "placement",
        },
      ]
    }
    return []
  })
)(Container)

let new_placement = [
  {
    billableClient: "",
    clientId: "",
    createdAt: "",
    createdBy: "",
    description: "",
    draft: false,
    employeeID: "",
    endDate: "",
    fillableSections: [
      "payments",
      "documents",
      "worklocation",
      "timesheets",
      "timesheets",
      "client_details",
      "invoices",
      "recruitment_details",
      "expense_details",
    ],
    id: "",
    isExist: false,
    placementID: "",
    projectEndDate: "",
    startDate: "",
    status: "",
    updatedAt: [],
    updatedBy: [],
    netTerms: "",
    jobTitle: "",
  },
]
