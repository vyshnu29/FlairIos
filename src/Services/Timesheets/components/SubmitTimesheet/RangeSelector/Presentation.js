import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";


function Presentation(props) {
  const { state, handleDateSelection, placement } = props
  const FORMAT = 'MM/dd/yyyy';
  if (!state.isSettingsLoaded)
    return (
      <div className="d-flex justify-content-between" >
        <div />
        <Skeleton variant="rect" width={350}>
          <div style={{ paddingTop: '300px' }} />
        </Skeleton>
        <div />
      </div>
    )
  console.log(state)
  return (
    <div className="d-flex justify-content-between">
      <div />
      <div>
        <DayPicker
          selectedDays={state.selectedRange}
          showOutsideDays
          onDayClick={handleDateSelection}
          format={FORMAT}
          disabledDays={[
            {
              after: state.type === "new" ? new Date(placement.endDate) : new Date(state.timesheetInfo.endDate),
              before: state.type === "new" ? new Date(placement.startDate) : new Date(state.timesheetInfo.startDate),
            },
          ]}
        />
      </div>
      <div />
    </div>
  )
}

export default Presentation
