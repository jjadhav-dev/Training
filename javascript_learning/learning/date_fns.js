const { format, parseISO, isValid, addDays, addMinutes, addWeeks 
    ,addMonths,subDays,subHours,subMonths
} = require('date-fns');
/*
    format methodh
    Syntax:
        format(date, pattern)
*/
// print current date 
console.log(new Date());

// Format method
console.log(format(new Date(2025,3,12),"yyyy/dd/MM"))

// print date name if we have print only "Thu" so we pass "EEE" and if we have reuired Thursday pass "EEEE"
console.log(format(new Date(2026,5,6),"EEE"))

// print date in that formay  dd MMM yyyy HH:mm:ss we get result for example: 22 May 2025 02:30:23
console.log(format(new Date(2025,4,22,2,30,23),'dd MMM yyyy HH:mm:ss'))

// if we required format Thu, 22 May 2025
console.log(format(new Date(2025,4,22,2,30,23),'EEE, dd MMM yyyy'))


/*
    parseISO methodh
    it's use to convert iso sting date into date object
    when we fetch date from db so we will get into string
    so we can not apply format methodh beause this string
    so we parseISO.
*/

const date_data = "2025-06-05T10:00:00Z"
console.log("Parse Date Object",parseISO(date_data));

// we can format date of pareseISO
console.log("date format",format(parseISO('2026-06-05T14:30:00.000Z'), 'dd MMM yyyy'));

console.log("Date",parseISO('2026-02-29'))

/*
    isValid():
        we isValid() funcation for cheak date are valid or not
*/

console.log("Invalid Date",isValid(parseISO('2026-02-30')))


/*
    addDays():
        we addDays() function for add days into date.
        it wiil not change current date they are 
        return new updated date
    same as other methodh work:  
        addMinutes(),addMonths(),addWeeks(),subDays(),subHours(),subMonths()
*/
// add 5 days into date
console.log("add 5 Days",addDays(new Date("2026 05 10"),5))

// add 3 minutes into date
console.log("add 3 Minutes",addMinutes(new Date("2026 05 10"),3))

// add  2 month into date
console.log("add 2 Month",addMonths(new Date("2026 05 10"),2))

// add 3 weeks into date
console.log("add 3 weeks",addWeeks(new Date("2026 06 20"),3));

// sub 5 days into date
console.log("sub 5 Days",subDays(new Date("2026 05 10"),5))

// sub 3 hours into date
console.log("sub 3 Hours",subHours(new Date("2026 05 10"),3))

// sub 2 month into date
console.log("sub 2 Month",subMonths(new Date("2026 05 10"),2))
