import React from 'react'
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper, TextField, Typography } from '@material-ui/core'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import validate from '../../../../../shared/validation'
import { CustomTableCell, HolidayCustomTableCell, CustomTableRow, useStyles } from "../../../styles/entryTable"
import Skeleton from '@material-ui/lab/Skeleton';
import { dayFormat, formatTime, getRange } from "../component_state/utils"
import NumberFormat from 'react-number-format'

const StyledTableCell = CustomTableCell

const HolidayStyledTableCell = HolidayCustomTableCell

const StyledTableRow = CustomTableRow

function timeEntryFormat(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      decimalScale={2}
      format="##:##"
      isAllowed={formatTime}
      mask={['h', 'h', 'm', 'm']}
      placeholder="hh:mm"
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.formattedValue,
          },
        });
      }}
    // isNumericString
    />
  );
}

function Presentation(props) {
  const classes = useStyles();
  const { timesheetSettings, standardTime, OTtime, loadEntryTable } = props.state
  const cycles = timesheetSettings.cycle
  const { handleTime } = props

  if (!standardTime.length)
    return (
      <div>
        <Typography component="div" variant={"h1"}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant={"h3"}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant={"h3"}>
          <Skeleton />
        </Typography>
        <Typography component="div" variant={"h3"}>
          <Skeleton />
        </Typography>
      </div>
    )
  const { placementStartDate, projectEndDate } = props.placement
  const cycle = 1
  console.log(standardTime)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ background: "linear-gradient(45deg, #280071 10%, #c42053 90%)", }} >
              <StyledTableCell ><div className="d-flex flex-column" ><span>{getRange(cycle)}</span><span>{validate.dateFormatter(standardTime[0].date) + "-" + validate.dateFormatter(standardTime[standardTime.length - 1].date)}</span></div> </StyledTableCell>
              {
                standardTime.map((item, index) => {
                  if (new Date(item.date).getDay() === 0 || new Date(item.date).getDay() === 6 || validate.dateWithNoTime(item.date) < validate.dateWithNoTime(placementStartDate))
                    return <HolidayStyledTableCell key={index} align="right"><div className="d-flex flex-column" ><span>{validate.dateFormatter(item.date)}</span><span>{dayFormat(new Date(item.date).getDay())}</span></div></HolidayStyledTableCell>
                  return <StyledTableCell key={index} align="right"><div className="d-flex flex-column" ><span>{validate.dateFormatter(item.date)}</span><span>{dayFormat(new Date(item.date).getDay())}</span></div></StyledTableCell>
                })
              }

            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Total hrs/day
                            </StyledTableCell>
              {
                standardTime.map((item, index) => {
                  return <StyledTableCell key={index} align="right">{new Date(item.date).getDay() === 0 || new Date(item.date).getDay() === 6 || validate.dateWithNoTime(item.date) < validate.dateWithNoTime(placementStartDate) ? "00:00" : "08:00"} </StyledTableCell>
                })
              }
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Standard time
                            </StyledTableCell>
              {
                standardTime.map((item, index) => {
                  return <StyledTableCell key={index} align="right"><TextField InputProps={{ inputComponent: timeEntryFormat }} disabled={validate.dateWithNoTime(item.date) < validate.dateWithNoTime(placementStartDate) || validate.dateWithNoTime(item.date) > validate.dateWithNoTime(projectEndDate) ? true : false} onChange={(e) => handleTime("standard", index, e.target.value)} type="text" style={textFieldStyles} variant="standard" value={item.value} /></StyledTableCell>
                })
              }
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                OT
                            </StyledTableCell>
              {
                OTtime.map((item, index) => {
                  return <StyledTableCell key={index} align="right"><TextField InputProps={{ inputComponent: timeEntryFormat }} disabled={validate.dateWithNoTime(item.date) < validate.dateWithNoTime(placementStartDate) || validate.dateWithNoTime(item.date) > validate.dateWithNoTime(projectEndDate) ? true : false} onChange={(e) => handleTime("ot", index, e.target.value)} type="text" style={textFieldStyles} variant="standard" value={item.value} /></StyledTableCell>
                })
              }
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Presentation



const textFieldStyles = {
  width: '47px'
}
