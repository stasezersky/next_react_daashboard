function merger(stateObj) {
    const smKeys = Object.keys(stateObj['smData'])
    smKeys.forEach(domain => {
        stateObj['smData'][domain].forEach(smRecored => {
            if (stateObj['m2Data'][domain]) {
                stateObj['m2Data'][domain].forEach(m2record => {
                    if (smRecored['lastDayOfWeek'] === m2record['lastDayOfWeek']) {
                        m2record['smAvg'] = smRecored['pcsAvg']
                    }
                })
            }
        }
        )
    })
    // console.log(stateObj['m2Data']);
    delete stateObj['smData']
    return stateObj
    
}

module.exports = { merger }