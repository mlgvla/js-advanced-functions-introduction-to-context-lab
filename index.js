function createEmployeeRecord(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empArrays) {
    return empArrays.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(empObj, dateStamp){
    //parse dateStamp into object
    let [date, hour] = dateStamp.split(' ')
    //push onto timeInEvents array
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return empObj
}

function createTimeOutEvent(empObj, dateStamp) {
    //parse dateStamp into object
    let [date, hour] = dateStamp.split(' ')
    //push onto timeOutEvents array
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return empObj
}

function hoursWorkedOnDate(empObj, date){
    //find date of In and Out Event
    let inEvent = empObj.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = empObj.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empObj, date) {
    let wages = empObj.payPerHour * hoursWorkedOnDate(empObj, date)
    return wages
}

function allWagesFor(empObj){
    //get all the clock in dates
    let dates = empObj.timeInEvents.map(function(e){
        return e.date
    })
    // return aggregate pay for all dates
    let totalWages = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(empObj, date)
    }, 0)
    return totalWages
}
