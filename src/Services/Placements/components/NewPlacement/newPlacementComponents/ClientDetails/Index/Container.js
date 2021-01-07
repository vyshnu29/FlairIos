import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import {
  addSectionToPlacement,
  updatePlacement,
} from "../../../../../middleware"
import {ActivityIndicator} from 'react-native'

function Container(props) {
  const {
    clientDetails_data,
    placement,
    profile,
    clients,
    addSectionToPlacement,
    updatePlacement,
  } = props
  const initState = {
    value: 0,
    tabList: [],
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
  }
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (isLoaded(clientDetails_data) && !isEmpty(clientDetails_data)) {
      let placementData = Object.entries(clientDetails_data.clients).map(([key, value]) => {
        return {
          ...value,
          isDraft: false,
        }
      })
      let firstTab = placementData.filter((placement) => placement.clientType === "Billable Client")
      let remainingTabs = placementData.filter(
        (placement) => placement.clientType !== "Billable Client"
      )
      let tabList = [...firstTab, ...remainingTabs].map((placement, index) => {
        return {
          ...placement,
          key: index,
          id: index,
          selectAddressList: [],
        }
      })
      console.log(tabList)
      setState((prevState) => ({
        ...prevState,
        tabList,
      }))
    } else {
      setState((prevState) => ({
        ...prevState,
        tabList: [
          {
            key: 0,
            id: 0,
            clientId: placement.clientId,
            workLocation: false,
            clientType: "Billable Client",
            selectAddress: "",
            subContracting: "",
            contingencyinPayment: "",
            prohibitionPeriod: "",
            rightToHire: "",
            liquidatedDamages: "",
            identification: "",
            comments: "",
            selectAddressList: [],
            isDraft: true,
          },
        ],
      }))
    }
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
    }))
    //return () => setState(() => ({ ...initState }))
  }, [clientDetails_data, placement])

  const addTab = () => {
    const { tabList } = state
    let id = tabList[tabList.length - 1].id + 1
    let data = tabList
    let newTab = {
      key: id,
      id: id,
      clientId: "",
      workLocation: false,
      clientType: "",
      selectAddress: "",
      subContracting: "",
      contingencyinPayment: "",
      prohibitionPeriod: "",
      rightToHire: "",
      liquidatedDamages: "",
      identification: "",
      comments: "",
      selectAddressList: [],
      isDraft: true,
    }
    data = [...data, newTab]
    setState({ ...state, tabList: data })
  }

  const deleteTab = (e) => {
    e.stopPropagation()
    if (state.tabList.length === 1) {
      return
    }
    let tabID = parseInt(e.target.id)
    let tabIDIndex = 0
    let tabList = state.tabList.filter((value, index) => {
      if (value.id === tabID) {
        tabIDIndex = index
      }
      return value.id !== tabID
    })
    if (!state.tabList[tabIDIndex].isDraft) {
      updatePlacement(
        {
          delete: true,
          clientId: state.tabList[tabIDIndex].clientId,
        },
        "client_details",
        state.employeeID,
        state.id
      )
    }
    let curValue = parseInt(state.value)
    if (curValue === tabID) {
      if (tabIDIndex === 0) {
        curValue = state.tabList[tabIDIndex + 1].id
      } else {
        curValue = state.tabList[tabIDIndex - 1].id
      }
    }
    setState((prevState) => ({
      ...prevState,
      value: curValue,
    }))
    setState((prevState) => ({
      ...prevState,
      tabList: tabList,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let payload = {}
    state.tabList.forEach((tab) => {
      payload[tab.clientId] = {
        clientId: tab.clientId,
        workLocation: tab.workLocation,
        clientType: tab.clientType,
        selectAddress: tab.selectAddress,
        subContracting: tab.subContracting,
        contingencyinPayment: tab.contingencyinPayment,
        prohibitionPeriod: tab.prohibitionPeriod,
        rightToHire: tab.rightToHire,
        liquidatedDamages: tab.liquidatedDamages,
        identification: tab.identification,
        comments: tab.comments,
      }
    })
    console.log(payload)
    if (state.fillableSections.includes("client_details")) {
      addSectionToPlacement(
        { clients: payload },
        "client_details",
        state.employeeID,
        state.id
      )
    } else {
      console.log("update")
    }
  }

  const handleChange = (tabList) => {
    setState({
      ...state,
      tabList,
    })
  }

  const handleTabChange = (event, value) => {
    setState({ ...state, value })
  }

  if (isLoaded(clientDetails_data))
    return (
      <Presentation
        {...state}
        handleChange={handleChange}
        handleTabChange={handleTabChange}
        addTab={addTab}
        deleteTab={deleteTab}
        handleSubmit={handleSubmit}
        clients={clients}
      />
    )

  return (
    <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { clients_list, clientDetails_data } = state.firestore.data
  return {
    clientDetails_data,
    clients: clients_list,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSectionToPlacement: (payload, sectionName, uid, placementID) => {
      dispatch(addSectionToPlacement(payload, sectionName, uid, placementID))
    },
    updatePlacement: (payload, sectionName, uid, placementID) => {
      dispatch(updatePlacement(payload, sectionName, uid, placementID))
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
                doc: "client_details",
                storeAs: "clientDetails",
              },
            ],
            storeAs: "placement_clientDetails",
          },
        ],
        storeAs: "clientDetails_data",
      },
    ]
  })
)(Container)
