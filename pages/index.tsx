import { parse } from 'cookieparser'
import { NextPageContext } from 'next';
import Container from "../components/Container";
import { UserData } from '../interface/UserData';
import { verify } from 'jsonwebtoken'
import path from 'path'
import { readFileSync } from 'fs'
import knex from 'knex'
import { getDateNumber, getWeekNumber } from '../utils';

const db = knex({ client: 'mysql', connection: { host: 'localhost', port: 3306, database: 'outgo', user: 'outgo' } })
const outweeks = JSON.parse(readFileSync(path.resolve() + '/data/date.json').toString('utf-8'))

interface Props {
  user: UserData
  dday: string
  outgo: boolean
  setdate: string
}

export default function Home ({ user, dday, outgo, setdate }: Props) {
  return (
    <Container>
      안녕하세요 {user.nickname}님!
      다음 출사 가능일:
      D-{dday}
      현재 출사 설정: {outgo} ({setdate})
    </Container>
  )
}

export async function getServerSideProps ({ req }: NextPageContext) {
  if (!req.headers.cookie) return { redirect: { destination: '/login', permanent: false } }
  const { token } = parse(req.headers.cookie)

  if (!token) return { redirect: { destination: '/login', permanent: false } }
  try {
    const decode = verify(token, process.env.JWT_TOKEN) as { id: string }
    const [user] = await db.select('*').where({ id: decode.id }).from('user')
    if (!user) return { redirect: { destination: '/login', permanent: false } }
    const { id, grade, class: classid, nickname, num } = user
    
    const thisweek = getWeekNumber(new Date())
    const outgoweek = outweeks.filter((weekData) => weekData.week > thisweek).sort((a, b) => a.week - b.week)[0]

    if (!outgoweek) return { props: { user: { id, grade, class: classid, nickname, num }, date: '?' }}

    const [year, month, date] = outgoweek.date.split('-')
    const dday = getDateNumber(new Date(year, (month as number) - 1, date)) - getDateNumber(new Date())
    
    const [outgo] = await db.select('*').where({ id }).andWhere('createdAt', '>', ).from('outgo')

    return { props: { user: { id, grade, class: classid, nickname, num }, dday, outgo: !!outgo }}
  } catch (err) { return { redirect: { destination: '/login', permanent: false }}}
}
