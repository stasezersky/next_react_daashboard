const xl = require('excel4node');
const timeHelper = require('./timeHelper');

let wb = new xl.Workbook();
let ws = wb.addWorksheet('SM performance');
ws.column(1).setWidth(50);
let headerStyle = wb.createStyle({
    font: {
        color: '000000',
        size: 14,
        bold: true,
    },
    alignment: {
        wrapText: true,
    },
    border: {
        left: {
            style: 'thin',
            color: '000000'
        },
        right: {
            style: 'thin',
            color: '000000'
        },
        top: {
            style: 'thin',
            color: '000000'
        },
        bottom: {
            style: 'thin',
            color: '000000'
        },
    }
});
let cellStyle = wb.createStyle({
    border: {
        left: {
            style: 'thin',
            color: '000000'
        },
        right: {
            style: 'thin',
            color: '000000'
        },
        top: {
            style: 'thin',
            color: '000000'
        },
        bottom: {
            style: 'thin',
            color: '000000'
        },
    }
});

async function writeToXls(newArr, datesArr){
    let today = timeHelper.getToday();
    // creating an index object that will contains dates and their indecies
    let indexObj = {};
    for (let i = 0; i < datesArr.length; i++) {
        indexObj[datesArr[i]] = { successCol: '' };
        indexObj[datesArr[i]].successCol = i + 2;
        ws.cell(1, i + 2).string(`${datesArr[i]}`).style(headerStyle);
        ws.cell(2, i + 2).string('Extracted SKUs').style(headerStyle);
    }
    // creating a set od domain (because there are multiple entries for each domain over dates)
    let domainsSet = new Set();
    for (let i = 0; i < newArr.length; i++) {
        domainsSet.add(newArr[i].domain);
    }
    // init of style for the spreadhseet
    let domainsArray = Array.from(domainsSet);
    for (let i = 0; i < datesArr.length; i++) {
        for (let j = 0; j <= domainsArray.length; j++) {
            ws.cell(j + 2, i + 2).style(cellStyle);
        }
    }
    // filing up the spreadsheet
    for (let i = 0; i < newArr.length; i++) {
        let domainIndex = domainsArray.indexOf(newArr[i].domain);
        let successCol;
        Object.keys(indexObj).forEach(date => {
            if (date === newArr[i].dateExtracted) {
                successCol = indexObj[date].successCol;
            }
        })
        ws.cell(domainIndex + 3, 1).string(newArr[i].domain).style(cellStyle);
        ws.cell(domainIndex + 3, successCol).number(newArr[i].success).style({ numberFormat: '#,##0' });
    }   

    wb.write(`${today}-Legacy-output.xlsx`);
}

async function groupByWeekToXls(objArr) {
    objArr = objArr.reverse();
    // creating an index object that will contains dates and their indecies
    let indexObj = {};
    for (let i = 0; i < objArr.length; i++) {
        indexObj[i] = objArr[i].lastDayOfWeek;
        ws.column(i + 2).setWidth(20);
        ws.cell(1, i + 2).string(`Week ends on - ${objArr[i].lastDayOfWeek}`).style(headerStyle);
        ws.cell(2, i + 2).string('Daily Average Extracted SKUs').style(headerStyle);
    }
    // creating a set of domains (because there are multiple entries for each domain over dates)
    let domainsSet = new Set();
    objArr.forEach(i => {
        i['weeklyStats'].forEach(o => {
            domainsSet.add(o['_id'])
        });
    })    
    // init of style for the spreadhseet
    let domainsArray = Array.from(domainsSet);
    for (let i = 0; i < objArr.length; i++) {
        for (let j = 0; j <= domainsArray.length; j++) {
            ws.cell(j + 2, i + 2).style(cellStyle);
        }
    }
    // filing up the spreadsheet
    for (let i = 0; i < objArr.length; i++) {
        for (let d = 0; d < objArr[i]['weeklyStats'].length; d++) {
            let domain = objArr[i]['weeklyStats'][d]['_id'];
            let avg = Math.trunc(Number.parseFloat(objArr[i]['weeklyStats'][d]['avg']));
            let domainIndex = domainsArray.indexOf(domain);
            ws.cell(domainIndex + 3, 1).string(domain).style(cellStyle);
            ws.cell(domainIndex + 3, i+2).number(avg).style({ numberFormat: '#,##0' });            
        }

    }
    const today = timeHelper.getToday();
    wb.write(`${today}-Legacy-output.xlsx`);
}

module.exports = { writeToXls, groupByWeekToXls }

