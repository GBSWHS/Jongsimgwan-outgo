const { GoogleSpreadsheet } = require('google-spreadsheet')
const { readFileSync } = require('fs')
const path = require('path').resolve()
const { schedule } = require('node-cron')
const moment = require('moment')
const knex = require('knex')
let lastsheet

const db = knex({ client: 'mysql', connection: { host: 'localhost', user: 'outgo', database: 'outgo', port: 3306 } })

const doc = new GoogleSpreadsheet('1Fh0Rk55NX4BahYsWVSYABhIEqlXM65EQSk6n25vp1oc');
const googleauth = JSON.parse(readFileSync(path + '/data/googleauth.json'))

async function renderSheet () {
  await doc.useServiceAccountAuth({ client_email: googleauth.client_email, private_key: googleauth.private_key })
  await doc.loadInfo()

  lastsheet = Object.keys(doc.sheetsById)[0]

  const sheet = await doc.addSheet(({ title: moment().format('YYYY년 MM월 DD일, hh시 mm분 ss초'), headerValues: ['반', '번호', '이름', '출사 사유'] }))
  if (lastsheet) await doc.deleteSheet(lastsheet)
  const results = await db.select('*').from('outgo').leftJoin('user', 'user.id', 'outgo.id')
  
  await sheet.addRows(results.reduce((prev, curr) => [...prev, { 반: curr.class, 번호: curr.num, 이름: curr.nickname, '출사 사유': curr.reason }], []))
  lastsheet = sheet.sheetId
}

async function resetDatabase () {
  await db.delete().from('outgo')
}

renderSheet()
schedule('*/1 * * * *', renderSheet)
schedule('0 0 * * 5', resetDatabase)
