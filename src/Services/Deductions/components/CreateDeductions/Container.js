import React from "react"
import { useState } from "react"
import Spinner from "react-native-loading-spinner-overlay"
import DeductionTable from "../DeductionsList"
import { connect } from "react-redux"
import { newDeduction, updateDeduction } from "../../middleware"
import { errorMsg } from "../../../../shared/SnackBars/index"

function Container(props) {
  const {
    listAll,
    id,
    access_modules,
    newDeduction,
    loggedInEmployee,
    updateDeduction,
    //getDeductionList,
  } = props

  const [state, setState] = useState({
    advanceType: "",
    givendate: "",
    chequeNumber: "",
    amount: "",
    $: "",
    deductPer: "",
    effectivefrom: "",
    notes: "",
    update: false,
    index: "",
    remainingBalance: "",
    deductionId: "",
    errorThrown: false,
    advanceList: ["Advance", "Premium", "Miscellaneous"],
    deductList: ["Per Paycheque", "Per Bi-Paycheque"],
  })

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    if (key === "$") {
      if (value <= state.amount) {
        setState({
          ...state,
          [event.target.name]: event.target.value,
        })
      }
    } else if (key != "$") {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleDateChange = (key, value) => {
    if (!isNaN(Date.parse(value))) {
      setState({
        ...state,
        [key]: value.toISOString(),
      })
    }
  }

  const handleData = (data) => {
    setState({
      ...state,
      notes: data,
    })
  }

  const onClickCancel = () => {
    setState({ ...state, update: false })
    clearValues()
  }

  const clearValues = () => {
    setState({
      ...state,
      advanceType: "",
      givendate: "",
      chequeNumber: "",
      amount: "",
      $: "",
      deductPer: "",
      effectivefrom: "",
      notes: "",
      update: false,
    })
  }

  const handleCreate = () => {
    const payload = {
      advanceType: state.advanceType,
      amount: Number(state.amount),
      amountTobeDeducted: Number(state.$),
      chequeNumber: Number(state.chequeNumber),
      deductPer: state.deductPer,
      effectivefrom: state.effectivefrom,
      givendate: state.givendate,
      notes: state.notes,
      remainingBalance: Number(state.amount),
    }
    newDeduction(payload, id, clearValues)
  }

  const handleUpdate = () => {
    const payload = {
      advanceType: state.advanceType,
      amount: Number(state.amount),
      amountTobeDeducted: Number(state.$),
      chequeNumber: Number(state.chequeNumber),
      deductPer: state.deductPer,
      effectivefrom: state.effectivefrom,
      givendate: state.givendate,
      notes: state.notes,
    }
    const oldInputs = props.deductions_list[state.deductionId]
    const paidAmount = Number(oldInputs.amount - oldInputs.remainingBalance)
    const remainingBalance = Number(payload.amount - paidAmount)
    if (remainingBalance < 0) errorMsg("Remaining balance go beyond zero")
    else updateDeduction(payload, state.deductionId, id)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!state.update) handleCreate()
    else handleUpdate()
  }

  const onPressEdit = (id) => {
    const req_deduction = props.deductions_list[id]
    if (typeof req_deduction === "object" && Object.keys(req_deduction).length) {
      setState({
        advanceType: req_deduction.advanceType,
        givendate: req_deduction.givendate,
        chequeNumber: req_deduction.chequeNumber,
        amount: req_deduction.amount,
        $: req_deduction.amountTobeDeducted,
        deductPer: req_deduction.deductPer,
        effectivefrom: req_deduction.effectivefrom,
        notes: req_deduction.notes,
        update: true,
        id: id,
        remainingBalance: req_deduction.remainingBalance,
        deductionId: id,
        errorThrown: false,
        advanceList: ["Advance", "Premium", "Miscellaneous"],
        deductList: ["Per Paycheque", "Per Bi-Paycheque"],
      })
    }
  }

  if (id) {
    return (
    <Spinner visible={true} />
    )
  }
  return (
    <DeductionTable
    {...props}
      listAll={props.listAll}
      onPressEdit={null}
      id={null}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    access_modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    deductions_list: state.firestore.data.deductions,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newDeduction: (payload, employeeID, callback) => {
      dispatch(newDeduction(payload, employeeID, callback))
    },
    updateDeduction: (payload, dedeuctionId, employeeID) => {
      dispatch(updateDeduction(payload, dedeuctionId, employeeID))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
