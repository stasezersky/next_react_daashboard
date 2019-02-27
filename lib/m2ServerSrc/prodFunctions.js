const timeHelper = require('./timeHelper');
const mongoHelper = require('./mongoHelper');


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

function transform(arr){
    let newArr = []

}

async function getWeeklyStatsFromMongo(timeframe){
    return await getAvgForWeeksFromMongo(timeframe)
}

module.exports = {
    getWeeklyStatsFromMongo
}

