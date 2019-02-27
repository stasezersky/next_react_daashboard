const csvReader = require('csvtojson');


async function readCsvTojson(filePath){


    let arr = await csvReader().fromFile(filePath).then((jsonObj) => { return jsonObj });
    let newArr = [];
    arr.forEach(obj => {
        newObj = {};
        newObj.domain = obj.topology.split('_')[0].toLowerCase();
        newObj.totalMessages = Number.parseInt(obj.total_messages);
        newObj.success = Number.parseInt(obj.success);
        newObj.dateExtracted = obj.run_date.split(" ")[0].split('/').reverse().join('-');
        let counter = 0;
        newArr.forEach(testObj => {
            if (testObj.domain === newObj.domain) {
                testObj.totalMessages = Number.parseInt(testObj.totalMessages) + Number.parseInt(newObj.totalMessages);
                testObj.success = Number.parseInt(testObj.success) + Number.parseInt(newObj.success);
                counter++;
            }
        });
        if (counter === 0) {
            newArr.push(newObj);
        }
    });
    return newArr;
}


module.exports = { readCsvTojson }