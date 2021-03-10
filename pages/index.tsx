import { parse } from 'cookieparser'
import { NextPageContext } from 'next';
import Container from "../components/Container";
import OutgoForm from "../components/OutgoForm";
import { UserData } from '../interface/UserData';
import { verify } from 'jsonwebtoken'
import path from 'path'
import { readFileSync } from 'fs'
import { useRouter } from 'next/router'
import knex from 'knex'
import { getDateNumber, getWeekNumber } from '../utils';

const db = knex({ client: 'mysql', connection: { host: 'localhost', port: 3306, database: 'outgo', user: 'outgo' } })
const outweeks = JSON.parse(readFileSync(path.resolve() + '/data/date.json').toString('utf-8'))

interface Props {
  user: UserData
  dday: string
  outgo: boolean
  reason: string
}

export default function Home ({ user, dday, outgo, reason }: Props) {
  const router = useRouter()

  async function abortOutGo () {
    if (confirm('출사 요청을 취소하시겠습니까?')) {
      const res = await fetch('/api/outgo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: '나는 출사를 취소합니다 국그릇 삥뽕~' })
      }).then((res) => res.json())
  
      if (!res.success) return alert(res.msg)
      alert('성공적으로 출사 요청을 취소하였습니다.')
      
      router.reload()
    } else return
  }

  return (
    <Container>
      안녕하세요 {user.nickname}님!
      다음 출사 가능일:
      D-{dday}
      현재 출사 설정: {outgo ? <span>응 맞음 ({reason})</span> : <span>응 아님</span>}
      { outgo ? <button onClick={abortOutGo}>출사 요청 취소</button> : <OutgoForm /> }
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
    
    const [outgo] = await db.select('*').where({ id }).from('outgo')

    return { props: { user: { id, grade, class: classid, nickname, num }, dday, outgo: !!outgo, reason: outgo?.reason || '' }}
  } catch (err) { console.log(err); return { redirect: { destination: '/login', permanent: false }}}
}
