function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    })
    return this
  }
  
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    })
  
    return this
  }
  
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date)
  
    if (!timeInEvent || !timeOutEvent) {
      return 0
    }
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
  
    return hoursWorked
  }
  
  
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
  }
  
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName)
}
function calculatePayroll(employeeRecords) {
  let totalPay = 0;
  employeeRecords.forEach(function (record) {
    totalPay += allWagesFor.call(record);
  });
  return totalPay;
}