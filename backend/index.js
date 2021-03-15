const knex = require('knex')
const moment = require('moment')
const { readFileSync } = require('fs')
const { schedule } = require('node-cron')
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
  console.log('Updated!')
  await clearSheet()
  await doc.loadInfo()

  const [sheet] = doc.sheetsByIndex
  await sheet.loadCells()

  await sheet.loadHeaderRow()
  const outgoDatas = await fetchOutgoData()

  await sheet.addRows(outgoDatas.reduce((prev, curr) => [...prev, {
    방번호: curr.roomno,
    학년: curr.grade + '학년',
    반: curr.class + '반',
    번호: curr.num + '번',
    이름: curr.nickname,
    사유: curr.reason,
    접수일: curr.created_at
  }], []))

  const timestamp = sheet.getCellByA1('F4:G4')
  timestamp.value = moment().format('YYYY년 MM월 DD일 hh:mm')
  timestamp.save()
}

async function clearSheet () {
  await doc.loadInfo()

  const [sheet] = doc.sheetsByIndex
  await sheet.loadCells()

  await sheet.loadHeaderRow()
  const rows = await sheet.getRows()

  for (const row of rows.slice(5)) { await row.delete() }
}

init()
schedule('* * * * *', renderSheet)
schedule('0 0 * * 1', resetOutgoData)
