import React from "react"
import TimeSheetsScreen from '../Services/Timesheets/components/TimesheetsList/Index/index'

function TimeSheets(props) {
  return (
  
      <TimeSheetsScreen listAll={true} employeeID={"fr"} {...props}/>
    
  )
}

export default TimeSheets