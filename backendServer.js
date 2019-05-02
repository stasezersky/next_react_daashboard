const m2ProdFunctions = require('./lib/m2ServerSrc/prodFunctions')
const smProdFunctions = require('./lib/smServerSrc/controllers/prodFunctions')
const timeHelper = require('./lib/m2ServerSrc/timeHelper')
const moment = require('moment');
const m2Transformer = require('./lib/m2ServerSrc/m2DataTrasnformer')
const smTransformer = require('./lib/smServerSrc/helpers/smDataTransformer')
const merger = require('./lib/merger').merger

const express = require('express')
const port = 5000

let stateObj = { m2Data: {} , smData: {} }

async function m2UpdateServerData() {
    const timeframe = timeHelper.getDatesInTimeFrame('2018-8-1', moment().format('YYYY-MM-DD'));
    const data = await m2ProdFunctions.getWeeklyStatsFromMongo(timeframe)
    if(!data){
        console.log("couldn't fetch data from M2")
        return
    }
    stateObj['m2Data'] = m2Transformer.transform(data)
    console.log('M2 data updated to state')  
}

async function smUpdateServerData() {
    const timeframe = timeHelper.getDatesInTimeFrame('2018-8-1', moment().format('YYYY-MM-DD'));
    const data = await smProdFunctions.getAvgForWeeksFromMongo(timeframe)
    if(!data) {
        console.log("couldn't fetch data from SM");
        return
    }
    stateObj['smData'] = smTransformer.transform(data)
    console.log('sm data updated to state')    
}

(async function(){
    await m2UpdateServerData()
    await smUpdateServerData()
    stateObj = merger(stateObj)
}())






const app = express()
app.get('/', function (req, res) {
    // console.log(stateObj.m2Data)
    res.json(stateObj)
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
