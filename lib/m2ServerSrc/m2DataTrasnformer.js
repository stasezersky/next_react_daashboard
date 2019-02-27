function createDomainsObj(rawArr) {
    let domainsSet = new Set();
    // let datesArr = rawArr.map(obj => obj.lastDayOfWeek)
    // let datesInitObj = Object.assign({}, ...datesArr.map(k => ({ [k]: { 'pcsAvg': '', 'esSuccessRate': '' } })))
    rawArr.forEach(weeklyRecord => {
        weeklyRecord['weeklyStats'].forEach(obj => {
            domainsSet.add(obj['_id'].toString())
        });
    })
    const domainsArr = Array.from(domainsSet)
    let dataObj = domainsArr.reduce((acc, domain) => Object.assign(acc, { [domain]: [] }), {})
    // console.log(dataObj)
    return dataObj
}

function fillDomainsObj(dataObj, rawArr) {
    rawArr.forEach(weeklyRecord => {
        // dataObj['supply.com']['2018-9-15']
        if (weeklyRecord['weeklyStats'][0]) {
            // console.log(weeklyRecord['weeklyStats'][0]['_id']);

            weeklyRecord['weeklyStats'].forEach(domainStats => {
                const lastDayOfWeek = weeklyRecord['lastDayOfWeek']
                const domain = domainStats['_id']
                const pcsAvg = domainStats['pcsAvg'].toFixed(2)
                const esSuccessRate = (domainStats['esSuccessCount'] / domainStats['esTotalCount']).toFixed(2)
                // const dataTest = dataObj[domain]
                // console.log(dataTest)
                // if(dataObj[domain]) console.log(dataObj[domain])
                // dataObj[domain] = Object.assign(dataObj[domain], { [lastDayOfWeek]: { pcsAvg, esSuccessRate } } )
                if (dataObj[domain]) {
                    dataObj[domain].push({ lastDayOfWeek ,pcsAvg, esSuccessRate }) 
                    dataObj[domain].sort((a,b) => ( new Date(a.lastDayOfWeek) - new Date(b.lastDayOfWeek) ))
                    // Object.assign(dataObj[domain], { lastDayOfWeek ,pcsAvg, esSuccessRate } )
                }
                // dataObj[domain][lastDayOfWeek] = { pcsAvg, esSuccessRate }

            });
        } else {
            // console.log(weeklyRecord)
        }
    });
    // console.log(dataObj)
    return dataObj
    // console.log(dataObj['datesInitObj']['2018-8-11']);
}

function transform(rawArr) {
    const dataObj = createDomainsObj(rawArr)
    return fillDomainsObj(dataObj, rawArr)
}
module.exports = {
    transform
}