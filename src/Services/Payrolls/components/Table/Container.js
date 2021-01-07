import React, { useEffect } from 'react'
import Presentation from "./Presentation"
import { _set_state, loadPayrollList } from "../../middleware"
import { connect } from "react-redux"
import { differenceInCalendarDays } from "date-fns"

function Container(props) {

  const { setState, state, modules } = props

  const calcDate = (date1, date2) => {
    let sdt = new Date(date2);
    let difdt = new Date(new Date(date1) - sdt);

    return difdt
  }

  const getDateDifference = (date1, date2) => {
    return differenceInCalendarDays(date2, date1)
  }

  return (

      <Presentation
        state={state}
        {...props}
        calcDate={calcDate}
        modules={modules}
        getDateDifference={getDateDifference}
      />
 
  )
}

const mapStateToProps = state => ({
  state: state.payrolls.payrollList,
  modules: state.employee.employeeModules.accessModules
})

const mapDispatchToProps = dispatch => ({
  setState: (obj) => dispatch(_set_state(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)
