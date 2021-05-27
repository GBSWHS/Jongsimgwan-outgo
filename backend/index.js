const knex = require('knex')
const moment = require('moment')
const { readFileSync } = require('fs')
const { schedule } = require('node-cron')
const { google } = require('googleapis')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const PATH = process.cwd()
const SHEET_ID = '1Fh0Rk55NX4BahYsWVSYABhIEqlXM65EQSk6n25vp1oc'

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'outgo',
    database: 'outgo'
  }
})

const doc = new GoogleSpreadsheet(SHEET_ID)
const googleAuth = JSON.parse(readFileSync(PATH + '/data/googleauth.json'))

const gSheet = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    keyFile: PATH + '/data/googleauth.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
})

const fetchOutgoData = async () =>
  await db.select('*').from('outgo').leftJoin('user', 'user.id', 'outgo.id')

const resetOutgoData = async () =>
  await db.delete().from('outgo')

async function init () {
  await doc.useServiceAccountAuth({
    client_email: googleAuth.client_email,
    private_key: googleAuth.private_key
  })

  await renderSheet()
}

async function renderSheet () {
  await clearSheet()
  await doc.loadInfo()

  const fullData = await fetchOutgoData()

  for (const sheetIndex in doc.sheetsByIndex) {
    const sheet = doc.sheetsByIndex[sheetIndex]
    const datas = fullData.filter((data) => sheetIndex > 3 ? (data.grade > 1) : (data.grade === 1 && data.class == Number(sheetIndex) + 1))

    await sheet.loadCells()
    for (const data of datas) {
      for (let rowIndex = 0; rowIndex < 20; rowIndex++) {
        if (sheet.getCellByA1(`B${5 + rowIndex}`).value == data.id) {
          if (data.grade < 2) {
            const sat = intToArray(data.sat)
            const sun = intToArray(data.sun)

            for (const cellIndex in sat) {
              sheet.getCellByA1(`${(13 + Number(cellIndex)).toString(36).toUpperCase()}${5 + rowIndex}`).value = sat[cellIndex] ? 'ㅇ' : ''
            }

            for (const cellIndex in sun) {
              sheet.getCellByA1(`${(17 + Number(cellIndex)).toString(36).toUpperCase()}${5 + rowIndex}`).value = sun[cellIndex] ? 'ㅇ' : ''
            }

            sheet.getCellByA1(`L${5 + rowIndex}`).value = data.reason || ''
            sheet.getCellByA1(`M${5 + rowIndex}`).value = data.destination || ''
          } else {
            const fri = intToArray(data.fri)
            const sat = intToArray(data.sat)
            const sun = intToArray(data.sun)

            for (const cellIndex in fri) {
              if (!cellIndex) continue
              sheet.getCellByA1(`${(13 + Number(cellIndex)).toString(36).toUpperCase()}${5 + rowIndex}`).value = sat[cellIndex] ? 'ㅇ' : ''
            }

            for (const cellIndex in sat) {
              if (cellIndex > 2) continue
              sheet.getCellByA1(`${(16 + Number(cellIndex)).toString(36).toUpperCase()}${5 + rowIndex}`).value = sat[cellIndex] ? 'ㅇ' : ''
            }

            for (const cellIndex in sun) {
              sheet.getCellByA1(`${(19 + Number(cellIndex)).toString(36).toUpperCase()}${5 + rowIndex}`).value = sun[cellIndex] ? 'ㅇ' : ''
            }

            sheet.getCellByA1(`N${5 + rowIndex}`).value = data.reason || ''
            sheet.getCellByA1(`O${5 + rowIndex}`).value = data.destination || ''
          }

          break
        }
      }
    }

    sheet.getCellByA1('J2').value = moment().format('YYYY년 MM월 DD일 출력됨')
    await sheet.saveUpdatedCells()
  }
}

async function clearSheet () {
  await gSheet.spreadsheets.values.batchClear({
    spreadsheetId: SHEET_ID,
    resource: {
      ranges: [
        "'소프트웨어개발과1'!D5:M23",
        "'소프트웨어개발과2'!D5:M24",
        "'게임개발과'!D5:M24",
        "'사물인터넷과'!D5:M23",
        "'경영회계과2,3학년'!D5:O17"
      ]
    }
  })
}

function intToArray (int) {
  return int.toString(2).padStart(4, '0').split('').reduce((prev, curr) => [curr === '1', ...prev], [])
}

init()
schedule('0 * * * *', renderSheet)
schedule('0 0 * * 1', resetOutgoData)
