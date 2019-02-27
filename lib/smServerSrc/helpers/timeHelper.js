const moment = require('moment');
function getStartOfLastDay() {
    let date = new Date();
    let yesterdayMS = date.getTime() - 86400000;
    date.setTime(yesterdayMS);
    let dayOfYesterday = date.getDate();
    let monthOfYesterday = date.getMonth() + 1;
    let yearOfYesterday = date.getFullYear();
    let fullDateOfLastDay = `${yearOfYesterday}-${monthOfYesterday}-${dayOfYesterday}`
    return fullDateOfLastDay
}
function getDateWeekAgo() {
    let date = new Date();
    let weekAgo = date.getTime() - 7 * 86400000;
    date.setTime(weekAgo);
    let dayOfweekAgo = date.getDate();
    let monthOfweekAgo = date.getMonth() + 1;
    let yearOfweekAgo = date.getFullYear();
    let fullDateOfweekAgo = `${yearOfweekAgo}-${monthOfweekAgo}-${dayOfweekAgo}`
    return fullDateOfweekAgo
}
function getToday() {
    let date = new Date();
    let dayOfToday = date.getDate();
    let monthOfToday = date.getMonth() + 1;
    let yearOfToday = date.getFullYear();
    let fullDateOfToday = `${yearOfToday}-${monthOfToday}-${dayOfToday}`
    return fullDateOfToday
}
function getDatesInTimeFrame(from, to) {
    let datesArr = [];
    let startDate = new Date(from);
    let endDate = new Date(to);
    if (startDate >= endDate) {
        console.log('Start date is after end date - nothing will happen');
        return false;
    }
    while (startDate.getTime() <= endDate.getTime()) {
        let day = endDate.getDate().toString().length == 1 ? '0' + endDate.getDate().toString() : endDate.getDate().toString() ;
        let month = (endDate.getMonth() + 1).toString().length == 1 ? '0' + (endDate.getMonth() + 1).toString() : (endDate.getMonth() + 1).toString();
        let year = endDate.getFullYear();
        let fullDate = `${year}-${month}-${day}`;
        datesArr.push(fullDate);

        let yesterdayMS = endDate.getTime() - 86400000;
        endDate.setTime(yesterdayMS);
    }
    return datesArr;
}

function groupDatesByWeeks(datesArr){
    let groups = datesArr.reduce((acc, date) => {
        let week = moment(Date.parse(date)).week();
        if (typeof acc[week] === 'undefined') {
            acc[week] = [];
        }
        acc[week].push(date);
        return acc;
    }, {});
    return groups;
}

module.exports = { 
    getStartOfLastDay,
    getDateWeekAgo,
    getToday,
    getDatesInTimeFrame,
    groupDatesByWeeks,
    
}