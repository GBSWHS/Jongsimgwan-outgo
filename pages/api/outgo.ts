import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import knex from 'knex'
import path from 'path'
import sha256 from 'sha256'
import { parse } from 'cookieparser'
import { readFileSync } from 'fs'
import { getWeekNumber, getDateNumber } from '../../utils'

const db = knex({ client: 'mysql', connection: { host: 'localhost', port: 3306, database: 'outgo', user: 'outgo' } })
const outweeks = JSON.parse(readFileSync(path.resolve() + '/data/date.json').toString('utf-8'))

export default async function outgoApi (req : NextApiRequest, res: NextApiResponse) {
  if (!req.headers.cookie) return res.json({ success: false, msg: '토큰이 없습니다.' })
  const { reason = '', passwd, startdate, enddate, destination, outgodate } = req.body
  const { token } = parse(req.headers.cookie)
  if (!token) return res.json({ success: false, msg: '토큰이 없습니다.' })
  if (reason.length < 10) return res.json({ success: false, msg: '출사 사유를 자세히 적어주세요. (최소 10자)' })

  const thisweek = getWeekNumber(new Date())
  const outgoweek = outweeks.filter((_, i) => i + 11 > thisweek).sort((a, b) => a.week - b.week)[0]

  const [year, month, date_] = outgoweek.date.split('-')
  const dday = getDateNumber(new Date(year, (month as number) - 1, date_)) - getDateNumber(new Date())
  if (!outgoweek.canGo) return res.json({ success: false, msg: '의무 출사주 입니다.' })
  if (dday > 5) return res.json({ success: false, msg: '아직 신청할 수 없습니다.' })

  try {
    const decode = verify(token, process.env.JWT_TOKEN) as { id: string }
    const [exist] = await db.select('*').where({ id: decode.id }).from('outgo')
    if (!exist) {
      if (!passwd) return res.json({ success: false, msg: '선생님 비밀번호를 입력해주세요.' })
      const [tuser] = await db.select('*').where({ id: decode.id.substr(0, 2) + '00' }).from('user')
      const [user] = await db.select('*').where({ id: decode.id }).from('user')
      if (!user.student) return res.json({ success: false, msg: '선생님은 잔류주 출사를 신청하실수 없습니다.' })
      if (!tuser) return res.json({ success: false, msg: '선생님 정보를 불러올 수 없습니다.' })
      if (tuser.passwd !== sha256(tuser.salt + passwd)) return res.json({ success: false, msg: '선생님 비밀번호가 일치하지 않습니다.' })
      await db.insert({ id: decode.id, reason, startdate, enddate, destination, outgodate }).into('outgo')
      return res.json({ success: true, msg: '성공적으로 잔류주 잔류(을)를 선택하였습니다' })
    } else {
      await db.select('*').where({ id: decode.id }).from('outgo').del()
      return res.json({ success: true, msg: '성공적으로 잔류주 외출(을)를 선택하였습니다' })
    }
  } catch (err) { console.log(err); return res.json({ success: false, msg: '잘못된 형식의 토큰입니다', err }) }
}
