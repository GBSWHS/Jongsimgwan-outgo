import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import knex from 'knex'
import sha256 from 'sha256'

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    database: 'outgo',
    user: 'outgo'
  }
})

export default async function loginApi (req: NextApiRequest, res: NextApiResponse) {
  const { id, passwd } = req.body
  const [user] = await db.select('*').where({ id }).from('user')
  if (!user) return res.json({ success: false, msg: '아이디 또는 비밀번호가 일치하지 않습니다' })
  if (user.passwd !== sha256(user.salt + passwd)) return res.json({ success: false, msg: '아이디 또는 비밀번호가 일치하지 않습니다' })
  const token = sign({ id, iat: Date.now() }, process.env.JWT_TOKEN)
  res.json({ success: true, token, redirect: user.salt.length < 1 ? '/passwd' : '/' })
}
