import { useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ApplyForm (dday) {
  const router = useRouter()
  const [passwd, setPasswd] = useState('')
  const [reason, setReason] = useState('')
  const [enddate, setEnddate] = useState('')
  const [startdate, setStartdate] = useState('')
  const [destination, setDestination] = useState('')

  function formattedDate (date: number) { return moment().add(date, 'days').format('YYYY-MM-DD') }

  async function onSubmit (event) {
    event.preventDefault()

    if (!startdate || !enddate) return alert('출사기간이 설정되어 있지 않습니다.')
    if (moment(startdate).get('hour') < 1 && moment(startdate).get('day') === 6) return alert('토요일은 오후 1시부터 신청 가능합니다.')
    if (!confirm('출사를 신청하시겠습니까?\n이 출사 요청은 사감 선생님께 전송됩니다.')) return
    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, passwd, destination, startdate, enddate, outgodate: moment(startdate).get('day') === 5 })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    router.push('/')
  }

  return (
    <form onSubmit={onSubmit} className="mb-10">
      <div className="inline-block max-w-sm mt-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">잔류주 출사 신청</span>
        <p>출사 사유</p>
        <textarea required onChange={(event) => setReason(event.target.value)} className="mb-1 h-52 bg-gray-200 rounded-md w-full p-2" placeholder="출사 사유를 적어주세요. (최소 10자) ex) 일요일날 치과예약이 있어서 치과에 가서 치과 진료를 받아야하기 때문에 가봐야합니다."></textarea>
        <br/><p>출사후 행선지</p>
        <textarea required onChange={(event) => setDestination(event.target.value)} className="mb-1 bg-gray-200 rounded-md w-full p-2" placeholder="출사후 행선지를 적어주세요. ex) 치과 진료 후 집으로 이동"></textarea>
        <br/><p>출사 기간</p>
        <div className="border-2 border-gray-100 rounded-md shadow-sm">
          <input onChange={(event) => setStartdate(event.target.value)} type="datetime-local" min={ formattedDate(dday.dday) + 'T16:30'} max={ formattedDate(dday.dday + 1) + 'T20:00'}/>부터
        </div>
        <div className="border-2 border-gray-100 mt-2 rounded-md shadow-sm">
          <input onChange={(event) => setEnddate(event.target.value)} type="datetime-local" min={ formattedDate(dday.dday + 2) + 'T17:00'} max={ formattedDate(dday.dday + 2) + 'T20:00'}/>까지
        </div>
      </div>
      <div className="inline-block max-w-sm m-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">담임 선생님 비밀번호</span>
        <input required onChange={(event) => (setPasswd(event.target.value))} type="password" placeholder="비밀번호" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
      </div>

      <div>
        <div className="inline-block px-10 max-w-sm w-full">
          <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">보내기</button>
        </div>
        <div className="inline-block px-10 max-w-sm my-5 w-full">
          <Link href="/"><button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">돌아가기</button></Link>
        </div>
      </div>
    </form>
  )
}
