import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase"
import { compose } from "redux"
import Presentation from "./Presentation"
import { addSectionToPlacement, updatePlacement } from "../../../../../middleware"
import { addDays } from "date-fns"
import { ActivityIndicator } from "react-native"
function Container(props) {
  const {
    placement,
    addSectionToPlacement,
    profile,
    payments_data,
    updatePlacement,
    invoices_data,
  } = props

  const initState = {
    OTbillingRate: 0,
    OTpayRate: 0,
    billingRate: 0,
    billingType: "",
    effectiveDate: "",
    effectiveUntil: "",
    employeePayRate: 0,
    payType: "",
    fixedPay: 0,
    purchaseOrderNumber: 0,
    percentage: 0,
    fillableSections: [],
    id: "",
    employeeID: profile.uid,
    data: [],
    update: false,
    index: null,
    disableOT: false,
  }

  const [state, setState] = useState(initState)

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      employeePayRate: (state.billingRate * state.percentage) / 100,
      OTpayRate: state.OTbillingRate,
    }))
  }, [state.billingRate, state.percentage, state.OTbillingRate])

  useEffect(() => {
    if (isLoaded(payments_data) && !isEmpty(payments_data)) {
      const data = payments_data.data
      setState((prevState) => ({
        ...prevState,
        data,
      }))
      const lastRecord = payments_data.data[payments_data.data.length - 1]
      const { effectiveUntil } = lastRecord
      if (!state.update)
        setState((prevState) => {
          return {
            ...prevState,
            effectiveDate: addDays(new Date(effectiveUntil), 1),
            effectiveUntil: "",
          }
        })
    } else {
      setState(() => {
        return {
          ...initState,
          effectiveDate: placement.startDate,
          effectiveUntil: placement.endDate,
        }
      })
    }
    setState((prevState) => ({
      ...prevState,
      fillableSections: placement.fillableSections,
      id: placement.id,
    }))
    if (isLoaded(invoices_data) && !isEmpty(invoices_data)) {
      const { OT } = invoices_data
      setState((state) => ({ ...state, disableOT: !OT }))
    }
    // return () => setState(() => ({ ...initState }))
  }, [placement, payments_data, invoices_data])

  const clearState = () => {
    setState((prevState) => ({
      ...prevState,
      OTbillingRate: 0,
      OTpayRate: 0,
      billingRate: 0,
      billingType: "",
      effectiveDate: "",
      effectiveUntil: "",
      employeePayRate: 0,
      payType: "",
      fixedPay: 0,
      purchaseOrderNumber: 0,
      percentage: 0,
      index: null,
      update: false,
    }))
  }

  const handleUpdate = (e, id) => {
    e.preventDefault()
    setState((prevState) => ({
      ...prevState,
      ...prevState.data[id],
      update: true,
      index: id,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.fillableSections.includes("payments")) {
      console.log("create")
      let payload = {
        data: [
          {
            OTbillingRate: state.OTbillingRate,
            OTpayRate: state.OTpayRate,
            billingRate: state.billingRate,
            billingType: state.billingType,
            effectiveDate: state.effectiveDate,
            effectiveUntil: state.effectiveUntil,
            employeePayRate: state.employeePayRate,
            payType: state.payType,
            fixedPay: state.fixedPay,
            purchaseOrderNumber: state.purchaseOrderNumber,
            percentage: state.percentage,
          },
        ],
      }
      console.log(payload)
      addSectionToPlacement(payload, "payments", state.employeeID, state.id, clearState)
    } else {
      let data = JSON.stringify(state.data)
      data = JSON.parse(data)
      const { index } = state
      const payment = {
        OTbillingRate: state.OTbillingRate,
        OTpayRate: state.OTpayRate,
        billingRate: state.billingRate,
        billingType: state.billingType,
        effectiveDate: state.effectiveDate,
        effectiveUntil: state.effectiveUntil,
        employeePayRate: state.employeePayRate,
        payType: state.payType,
        fixedPay: state.fixedPay,
        purchaseOrderNumber: state.purchaseOrderNumber,
        percentage: state.percentage,
      }
      if (index !== null) {
        data[state.index] = payment
        if (state.index !== state.data.length - 1) {
          let temp = data[index + 1]
          let date = new Date(payment.effectiveUntil)
          console.log(date.toISOString())
          date.setDate(date.getDate() + 1)
          let updatedData = { ...temp, effectiveDate: date.toISOString() }
          console.log(date.toISOString())
          data[index + 1] = updatedData
        }
        if (index !== 0) {
          let temp = data[index - 1]
          let date = new Date(payment.effectiveDate)
          console.log(date.toISOString())
          date.setDate(date.getDate() - 1)
          let updatedData = { ...temp, effectiveUntil: date.toISOString() }
          console.log(date.toISOString())
          data[index - 1] = updatedData
        }
      } else {
        data = [...data, payment]
      }
      const payload = {
        data: data,
      }
      updatePlacement(payload, "payments", state.employeeID, state.id, clearState)
    }
  }

  const handleChange_Strings = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleChange_Numbers = (event) => {
    const { name, value } = event.target
    if (!isNaN(parseInt(value))) {
      setState({
        ...state,
        [name]: parseInt(value),
      })
    }
  }

  const handleChange_Date = (key, value) => {
    if (!isNaN(Date.parse(value))) {
      const date = new Date(value)
      date.setHours(0, 0, 0, 0)
      setState({
        ...state,
        [key]: date.toISOString(),
      })
    }
  }

  if (isLoaded(payments_data)) {
    return (
      <Presentation
        state={state}
        handleSubmit={handleSubmit}
        handleChange_Strings={handleChange_Strings}
        handleChange_Numbers={handleChange_Numbers}
        handleChange_Date={handleChange_Date}
        handleUpdate={handleUpdate}
        clearState={clearState}
      />
    )
  }
  return (
   <ActivityIndicator/>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { payments_data, invoices_data } = state.firestore.data
  return {
    payments_data,
    invoices_data,
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
                doc: "payments",
              },
            ],
          },
        ],
        storeAs: "payments_data",
      },
    ]
  })
)(Container)
