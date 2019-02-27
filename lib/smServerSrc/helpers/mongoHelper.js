const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
// const url = 'mongodb://18.188.76.14:27017'
const dbNAme = 'SMperofrmance';
const colName = 'daily';

async function checkIfUsedToday(dateExtracted) {
    try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbNAme);
        const response = await db.collection(colName).find({ dateExtracted }).toArray();
        if (response[0].dateExtracted) {
            console.log(true);
            return true;
        }
    } catch (error) {
        console.log('date isn\'t used');
        return false;
    }


}

// writes all the daily counts to mongo 
async function writeAllCounts(countsArr) {
    let client;
    try {
        const currentBatchDate = countsArr[0].dateExtracted;
        const dateAlreadyExtracted = await checkIfUsedToday(currentBatchDate);
        if(!dateAlreadyExtracted) {
            client = await MongoClient.connect(url);
            const db = await client.db(dbNAme);
            const response = await db.collection(colName).insertMany(countsArr);
            client.close();
            return response;
        } else {
            return { dateAlreadyUsed: true }
        }

    } catch (error) {
        debug(error.stack);
        return {};
    }
}

// gets all counts for a single date - input is a date (yyyy-mm-dd) - output is array of objects
async function getAllCounts(dateExtracted) {
    let client;
    try {
        client = await MongoClient.connect(url), { useNewUrlParser: true };
        const db = await client.db(dbNAme);
        const col = await db.collection(colName);
        let domainArr = await col.find({ dateExtracted }).toArray();
        client.close();
        return domainArr;
    } catch (error) {
        debug(error.stack);
        client.close();
        return {};
    }
}

async function getAllCountsForTimeFrame(dates) {
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbNAme);
        const col = await db.collection(colName);
        let domainArr = await col.find({ 'dateExtracted': { $in: dates } }).toArray();
        client.close();
        return domainArr;
    } catch (error) {
        debug(error.stack);
        client.close();
        return {};
    }
}

async function getAvgByWeeks(dates) {
    let client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = await client.db(dbNAme);
        const col = await db.collection(colName);
        let domainArr = await col.aggregate([
            { $match: { dateExtracted: { $in: dates } } },
            { $group: { _id: "$domain", avg: { $avg: "$success" } } }    
        ]).toArray();
        client.close();
        return domainArr;
    } catch (error) {
        debug(error.stack);
        client.close();
        return {};
    }
}



module.exports = {
    writeAllCounts,
    getAllCounts,
    getAllCountsForTimeFrame,
    getAvgByWeeks
}