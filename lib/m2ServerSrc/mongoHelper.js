const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'
// const url = 'mongodb://18.188.76.14:27017'
const dbNAme = 'salesBooster';
const colName = 'PCSCounts';


async function getAvgByWeeks(dates) {
    let client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true } );
        const db = await client.db(dbNAme);
        const col = await db.collection(colName);
        let domainArr = await col.aggregate([
            { $match: { dateExtracted: { $in: dates } } },
            { $group: { _id: "$domainName", pcsAvg: { $avg: "$count" }, esSuccessCount: { $sum: "$esSuccessCount" }, esTotalCount: { $sum: "$esTotalCount" } } }
        ]).toArray();
        client.close();
        return domainArr;
    } catch (error) {
        client.close();
        return {};
    }
}

module.exports = { 
    getAvgByWeeks
}