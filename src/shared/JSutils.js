import { eachDayOfInterval, isWithinInterval, addDays } from "date-fns"

export class TimesheetsUTILS {
  static calc_hours(arr) {
    const hours = [],
      minutes = [];
    arr.map(item => item.value).forEach((item) => {
      const [h, m] = item.split(":");
      hours.push(parseInt(h));
      minutes.push(parseInt(m));
    });
    let totalHours = hours.reduce((a, b) => a + b, 0);
    let totalMinutes = minutes.reduce((a, b) => a + b, 0);
    totalHours = parseInt(totalHours + totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;
    console.log(totalHours +
      ":" +
      "0".repeat(2 - remainingMinutes.toString().length) +
      remainingMinutes.toString())
    return (
      totalHours +
      ":" +
      "0".repeat(2 - remainingMinutes.toString().length) +
      remainingMinutes.toString()
    );
  }


  static calcTotalTime(arr) {
    const hours = [],
      minutes = [];
    arr.forEach((item) => {
      const [h, m] = item.split(":");
      hours.push(parseInt(h));
      minutes.push(parseInt(m));
    });
    let totalHours = hours.reduce((a, b) => a + b);
    let totalMinutes = minutes.reduce((a, b) => a + b);
    totalHours = parseInt(totalHours + totalMinutes / 60);
    let remainingMinutes = totalMinutes % 60;
    console.log(totalHours +
      ":" +
      "0".repeat(2 - remainingMinutes.toString().length) +
      remainingMinutes.toString())
    return (
      totalHours +
      ":" +
      "0".repeat(2 - remainingMinutes.toString().length) +
      remainingMinutes.toString()
    );
  }

  static calcTotalAmount(workingTime, payRateAmount) {
    console.log(workingTime)
    const [h, m] = workingTime.split(":")
    return Math.floor(h * payRateAmount + (payRateAmount * m) / 60)
  }

  static getPayRate(timesheet, payRateDetails, workType) {
    return workType === "standardTime"
      ? payRateDetails[0].billingRate
      : payRateDetails[0].OTbillingRate
    // const start = new Date(timesheet.startDate).setHours(0, 0, 0, 0),
    //   end = new Date(timesheet.endDate).setHours(0, 0, 0, 0)
    // if (payRateDetails.length === 1) {
    //   return workType === "standardTime"
    //     ? payRateDetails[0].billingRate
    //     : payRateDetails[0].OTbillingRate
    // }
    // for (let i = 0; i < payRateDetails.length; i++) {
    //   // check both dates in range or not
    //   const payRate = payRateDetails[i]
    //   const checkStartRange = isWithinInterval(start, {
    //     start: new Date(payRate.effectiveDate).setHours(0, 0, 0, 0),
    //     end: new Date(payRate.effectiveUntil).setHours(0, 0, 0, 0),
    //   })

    //   const checkEndRange = isWithinInterval(end, {
    //     start: new Date(payRate.effectiveDate).setHours(0, 0, 0, 0),
    //     end: new Date(payRate.effectiveUntil).setHours(0, 0, 0, 0),
    //   })

    //   if (checkStartRange && checkEndRange) {
    //     return workType === "standardTime"
    //       ? payRate.billingRate
    //       : payRate.OTbillingRate
    //   } else if (checkStartRange || checkEndRange) {
    //     return workType === "standardTime"
    //       ? payRate.billingRate
    //       : payRate.OTbillingRate + ", " + workType === "standardTime"
    //         ? payRateDetails[i + 1].billingRate
    //         : payRateDetails[i + 1].OTbillingRate
    //   } else if (checkEndRange) {
    //     return workType === "standardTime"
    //       ? payRate.billingRate
    //       : payRate.OTbillingRate + ", " + workType === "standardTime"
    //         ? payRateDetails[i - 1].billingRate
    //         : payRateDetails[i - 1].OTbillingRate
    //   } else {
    //     return workType === "standardTime"
    //       ? payRateDetails.reverse()[0].billingRate
    //       : payRateDetails.reverse()[0].OTbillingRate
    //   }
    // }
  }

  static IterateThroughEveryPaymentRate(
    date,
    payRateDetails,
    workingTime,
    workType
  ) {
    for (let i = 0; i < payRateDetails.length; i++) {
      const start = new Date(payRateDetails[i].effectiveDate).setHours(0, 0, 0, 0),
        end = new Date(payRateDetails[i].effectiveUntil).setHours(0, 0, 0, 0)
      const checkRange = isWithinInterval(date, {
        start: start,
        end: end,
      })
      if (checkRange) {
        const [h, m] = workingTime.split(":")
        return Math.floor(
          h *
          payRateDetails[i][
          workType === "standardTime" ? "billingRate" : "OTbillingRate"
          ] +
          (payRateDetails[i][
            workType === "standardTime" ? "billingRate" : "OTbillingRate"
          ] *
            m) /
          60
        )
      }
    }
  }



  static getBillableHours(start, end) {
    let hours = 0
    try {
      const days = eachDayOfInterval({
        start: new Date(start),
        end: new Date(end),
      })
      days.forEach((day) => {
        if (new Date(day).getDay() > 0 && new Date(day).getDay() < 6) {
          hours += 8
        }
      })
      return hours
    } catch (error) {
      hours = 0
      return hours
    }

  }
}

export class InvoiceUTILS {
  static _form_ranges_between(start, end, interval) {
    const ranges = []
    for (let i = new Date(start); i <= new Date(end); i = addDays(i, interval)) {
      ranges.push({
        start: new Date(i).setHours(0, 0, 0, 0),
        end: addDays(i, interval)
      })
    }

    return ranges
  }

  static _calc_discount_details(discountDetails, amount) {
    return discountDetails.reduce((initial, item) => {
      if (item.type === "byValue") {
        return initial - Number(item.value)
      } else if (item.type === "byPercentage" && Number(item.value) > 0) {
        return initial - Number((amount * Number(item.value)) / 100)
      } else {
        return initial - 0
      }
    }, 0)

  }

  static CalcGrandTotal(discountDetails, subTotal) {
    const discountAmount =
      discountDetails.reduce((initial, item) => {
        if (item.type === "byValue") {
          return initial - Number(item.value)
        } else if (item.type === "byPercentage" && Number(item.value) > 0) {
          return initial - Number((subTotal * Number(item.value)) / 100)
        } else {
          return initial - 0
        }
      }, 0)
    return (subTotal + discountAmount).toFixed(2)
  }
}

export class JSutils {
  static _array_to_object(array, key) {
    return array.reduce((initial, item) => {
      return {
        ...initial,
        [item[key]]: item
      }
    }, {})
  }

  static _sum(arr) {
    return arr.reduce((a, b) => a + b, 0)
  }

  static _array_to_chunk(arr, num) {
    const chunkedArray = []
    for (let i = 0; i < arr.length; i += num) {
      chunkedArray.push(arr.slice(i, i + num))
    }
    return chunkedArray
  }
}