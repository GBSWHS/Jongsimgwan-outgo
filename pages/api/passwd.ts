import sha256 from 'sha256'
import knex from 'knex'
import { parse } from 'cookieparser'
import { verify } from 'jsonwebtoken'
import randStr from 'crypto-random-string'
import { NextApiRequest, NextApiResponse } from 'next'

const db = knex({ client: 'mysql', connection: { host: 'localhost', port: 3306, database: 'outgo', user: 'outgo' } })

export default async function passwdApi (req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.cookie) return res.json({ success: false, msg: '토큰이 없습니다.' })

  const { token } = parse(req.headers.cookie)
  const { passwd = '' } = req.body

  if (!token) return res.json({ success: false, msg: '토큰이 없습니다.' })
  if (passwd.length < 4) return res.json({ success: false, msg: '비밀번호는 최소 4자 이상 입력되어야 합니다' })

  const salt = randStr({ length: 8 })

  try {
    const decode = verify(token, process.env.JWT_TOKEN) as { id: string }
    await db.update({ passwd: sha256(salt + passwd), salt }).where({ id: decode.id }).from('user')

    return res.json({ success: true, redirect: '/' })
  } catch (err) { console.log(err); return res.json({ success: false, msg: '잘못된 형식의 토큰입니다', err }) }
}
