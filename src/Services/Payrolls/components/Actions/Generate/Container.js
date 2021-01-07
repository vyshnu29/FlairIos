import React, { useState } from 'react'
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { generatePayrollForEmployee } from "../../../middleware"

function Container(props) {
  const { employeeID, state, _generate_payroll_for_employee } = props
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onGenerate = () => {
    _generate_payroll_for_employee(employeeID)
    handleClose()
  }
  return (
    <div>
      <Presentation
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onGenerate={onGenerate}
        employeeID={employeeID}
        state={state}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  state: state.payrolls.payrollList
})

const mapDispatchToProps = dispatch => ({
  _generate_payroll_for_employee: (employeeID) => dispatch(generatePayrollForEmployee(employeeID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)