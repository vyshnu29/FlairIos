import React, { useState } from 'react'
import Presentation from "./Presentation"
import { updatePayrollSettings } from "../../../middleware"
import { connect } from "react-redux"

function Container(props) {
  const { _update_payroll_settings, settings, employeeID, state } = props
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onUpdate = () => {
    handleClose()
    const obj = {
      dealPay: Number(settings.dealPay),
      dealPeriod: Number(settings.dealPeriod),
      dealPeriodRange: settings.dealPeriodRange,
      fixedPay: Number(settings.fixedPay),
      insurance: Number(settings.insurance),
      payBonus: Number(settings.payBonus),
      excludeDeductions: settings.excludeDeductions,
      amountToBeConsidered: Number(settings.amountToBeConsidered),
      exludeForNoOfPayrolls: Number(settings.exludeForNoOfPayrolls),
      stopPayroll: settings.stopPayroll,
      isBench: settings.isBench,
      fixedBenchPay: Number(settings.fixedBenchPay)
    }
    _update_payroll_settings(obj, employeeID)
  }

  return (
    <div>
      <Presentation
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onUpdate={onUpdate}
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
  _update_payroll_settings: (inputs, employeeID) => dispatch(updatePayrollSettings(inputs, employeeID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)