const path = require('path');
// const csvReader = require('../helpers/csvHelper');
const mongoHelper = require('../helpers/mongoHelper');
const timeHelper = require('../helpers/timeHelper');
// const xlsHelper = require('../helpers/xlsHelper');
// // const moment = require('moment');

// async function saveCsvToMongo(filePath) {
//     const arr = await csvReader.readCsvTojson(filePath);
//     const res = await mongoHelper.writeAllCounts(arr);
//     console.log(res);
//     process.exit(0);
// }

// async function xlsForTimeFrame(datesArr) {
//     const res = await mongoHelper.getAllCountsForTimeFrame(datesArr);
//     const newArr = await xlsHelper.writeToXls(res, datesArr);
//     console.log(newArr);

// }

async function getAvgForWeeksFromMongo(weekArr) {
    let weeksObj = timeHelper.groupDatesByWeeks(weekArr);
    let weeksIndexArr = Object.keys(weeksObj);
    let weeklyStatsArr = [];
    for (let weekIndex of weeksIndexArr) {
        let weekDaysArr = weeksObj[weekIndex];
        // don't switch places between first and last day because .reverse() leaves the array reversed
        let lastDayOfWeek = weekDaysArr[0];
        let firstDayOfWeek = weekDaysArr.reverse()[0];

        let weeklyStats = await mongoHelper.getAvgByWeeks(weekDaysArr);

        weeklyStatsArr.push({
            firstDayOfWeek,
            lastDayOfWeek,
            weeklyStats
        });
    }
    return weeklyStatsArr;
    
}

// async function writeXlsWithWeeklyStats(timeFrame) {
//     let arr = await getAvgForWeeksFromMongo(timeFrame);
//     xlsHelper.groupByWeekToXls(arr)
// }

module.exports = { 
    getAvgForWeeksFromMongo
}