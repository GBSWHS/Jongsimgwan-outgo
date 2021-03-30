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

  const [sheet] = doc.sheetsByIndex
  await sheet.loadCells()

  await sheet.loadHeaderRow()
  const outgoDatas = await fetchOutgoData()
  console.log(outgoDatas)
  await sheet.addRows(outgoDatas.reduce((prev, curr) => [...prev, {
    방번호: curr.roomno,
    학년: curr.grade + '학년',
    반: curr.class + '반',
    번호: curr.num + '번',
    이름: curr.nickname,
    사유: curr.reason,
    위치: curr.destination,
    접수일: moment(curr.created_at).format('YYYY년 MM월 DD일 hh:mm'),
    출사시작: moment(curr.startdate).format('YYYY년 MM월 DD일 hh:mm') + ' - ' + (Number(curr.outgodate) ? '금요일 저녁' : '토요일 오후 1시'),
    복귀일: moment(curr.enddate).format('YYYY년 MM월 DD일 hh:mm')
  }], []))

  const timestamp = sheet.getCellByA1('F2:G4')
  timestamp.value = '마지막 갱신 일자\n' + moment().format('YYYY년 MM월 DD일 hh:mm')
  timestamp.save()
}

async function clearSheet () {
  await gSheet.spreadsheets.values.batchClear({
    spreadsheetId: SHEET_ID,
    resource: {
      ranges: ["'출사인원 목록'!A7:Z10000"]
    }
  })
}

init()
schedule('* * * * *', renderSheet)
schedule('0 0 * * 1', resetOutgoData)
