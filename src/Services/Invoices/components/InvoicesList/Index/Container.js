import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { setState } from "../../../middleware/invoiceList"

function Container(props) {
  const { listAll, listAllCriteriaID, _set_state } = props


  useEffect(() => {
    _set_state({
      listAll,
      listAllCriteriaID
    })
  }, [])
  return (

      <Presentation {...props} />
  )
}

const mapStateToProps = (state) => {
  return {
    modules: state.employee.employeeModules.accessModules,
    loggedInEmployee: state.firebase.auth.uid,
    state: state.invoice.invoiceList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _set_state: (obj) => dispatch(setState(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)