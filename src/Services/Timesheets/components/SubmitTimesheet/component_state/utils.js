import {
  addDays,
  closestTo,
  getDaysInMonth,
  getWeek,
  isWithinInterval,
  differenceInDays,
} from "date-fns";
import validate from "../../../../../shared/validation"

export function utils() {

  const _getDayByIndex = (day) => {
    switch (day) {
      case "Sunday":
        return 0;
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;
      case "Saturday":
        return 6;
      default:
        return null;
    }
  }

  const _getRangeByIndex = (rangeIndex) => {
    switch (rangeIndex) {
      case 0:
        return 0; // daily
      case 1:
        return 6; // weekly
      case 2:
        return 13; // biweekly
      case 3:
        return 14; // semimonthly
      case 4:
        return 29; // monthly
      default:
        return 0;
    }
  }

  const _getDateRangeByDay = (endDate, _startDay, range) => {
    const startDay = _getDayByIndex(_startDay)
    const endDay = new Date(endDate).getDay()
    console.log(`startDay: ${startDay} - endDay: ${endDay}`)
    let days;
    if (endDay > startDay) {
      console.log("case1")
      days = endDay - startDay
      /* 
          here 1 is subtracted from days because, if the cycle need to start from a particular day 
          then the previous date should end before one day 
      */
      console.log(7 - days - 1)
      return 7 - days - 1
      return addDays(new Date(endDate), days)
    } else if (endDay < startDay) {
      console.log("case2")
      days = startDay - endDay
      console.log(days)
      return days - 1
      return addDays(new Date(endDate), days - 1)
    } else {
      console.log("case3")
      return _getRangeByIndex(range) + 1
      return addDays(new Date(endDate), _getRangeByIndex(range))
    }
  }

  const _getRangeEndDate = (startDate, range) => {
    return addDays(startDate, _getRangeByIndex(range))
  }

  const cycleChecker = (start, end, cycle) => {
    // const { date, startDay, range }
    // if(isWithinInterval())
  }

  return {
    getDayByIndex: _getDayByIndex,
    getDateRangeByDay: _getDateRangeByDay,
    getRangeEndDate: _getRangeEndDate
  }
}



export const dayFormat = (index) => {
  switch (index) {
    case 0: return "Sunday"
    case 1: return "Monday"
    case 2: return "Tuesday"
    case 3: return "Wednesday"
    case 4: return "Thursday"
    case 5: return "Friday"
    case 6: return "Saturday"
    default: return ""
  }
}

export const getRange = (range) => {
  switch (range) {
    case 0: return "DAILY"
    case 1: return "WEEKLY"
    case 2: return "BI-WEEKLY"
    case 3: return "SEMI-MONTHLY"
    case 4: return "MONTHLY"
    default: return ""
  }
}

export function formatTime(time) {
  const { formattedValue, value } = time
  const check = (val, max) => {
    if (parseInt(value) > 2400 || (val.length === max.length && parseInt(val) > parseInt(max))) {
      return false
    }
    return true
  }
  const hours = check(formattedValue.substring(0, 2), '24')
  const minutes = check(formattedValue.substring(3, 5), '59')
  return hours && minutes
}

export const handleTableChange = (start, end, placementStartDate, placementEndDate) => {
  const newArr = []
  const OTArr = []
  console.log(start, end)
  if (!isNaN(start) && !isNaN(end)) {
    console.log("fk")
    const indexCount = ((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)).toFixed(0)
    for (let i = 0; i <= indexCount; i++) {
      OTArr.push({
        date: addDays(new Date(start), i).setHours(0, 0, 0, 0),
        value: "00:00"
      })
      if (addDays(new Date(start), i).getDay() === 0 || addDays(new Date(start), i).getDay() === 6 || validate.dateWithNoTime(addDays(new Date(start), i)) < validate.dateWithNoTime(placementStartDate) || validate.dateWithNoTime(addDays(new Date(start), i)) > validate.dateWithNoTime(placementEndDate))
        newArr.push({
          date: addDays(new Date(start), i).setHours(0, 0, 0, 0),
          value: "00:00"
        })
      else
        newArr.push({
          date: addDays(new Date(start), i).setHours(0, 0, 0, 0),
          value: "08:00"
        })
    }
  }
  console.log(newArr, OTArr)
  return {
    standardTime: newArr,
    OTArr,
    startDate: new Date(start).setHours(0, 0, 0, 0),
    endDate: new Date(end).setHours(0, 0, 0, 0)
  }
}