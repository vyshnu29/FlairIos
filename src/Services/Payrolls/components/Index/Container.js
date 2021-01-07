import React, { useEffect } from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { _set_state, unsubscribeListener, loadPayrollList } from "../../middleware"

function Container(props) {
  const { listAll, setState, employeeID, state, unsubscribe_listener, _load_payroll_list } = props
  useEffect(() => {
    setState({
      listAll: listAll,
      employeeID: employeeID
    })

    if (listAll === true)
      _load_payroll_list(listAll)
    else if (listAll === false)
      _load_payroll_list(listAll, employeeID)

    return () => {
      unsubscribe_listener()
    }
  }, [listAll])
  console.log("woo")
  return (
   
      <Presentation
        state={state}
        {...props}
      />
  
  )
}

const mapStateToProps = state => ({
  state: state.payrolls.payrollList
})

const mapDispatchToProps = dispatch => ({
  setState: (obj) => dispatch(_set_state(obj)),
  unsubscribe_listener: () => dispatch(unsubscribeListener()),
  _load_payroll_list: (listAll, employeeID) => dispatch(loadPayrollList(listAll, employeeID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
