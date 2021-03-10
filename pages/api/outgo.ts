import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import knex from 'knex'
import { parse } from 'cookieparser'

const db = knex({ client: 'mysql', connection: { host: 'localhost', port: 3306, database: 'outgo', user: 'outgo' } })

export default async function outgoApi (req : NextApiRequest, res: NextApiResponse) {
  if (!req.headers.cookie) return res.json({ status: 400, msg: '토큰이 없습니다.' })
  const { token } = parse(req.headers.cookie)
  if (!token) return res.json({ status: 400, msg: '토큰이 없습니다.' })

  try {
    const decode = verify(token, process.env.JWT_TOKEN)

  } catch (err) { return res.json({ status: 400, msg: '잘못된 형식의 토큰입니다' })}
  const [exist] = await db.where({ id })
  db.insert({}).from('outgo').select('*')
}
