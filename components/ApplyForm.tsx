import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ApplyForm () {
  const router = useRouter()
  const [reason, setReason] = useState('')
  const [passwd, setPasswd] = useState('')
  const [date, setDate] = useState('')
  async function onSubmit (event) {
    setDate('1')
    event.preventDefault()

    if (!confirm('출사를 신청하시겠습니까?\n이 출사 요청은 사감 선생님께 전송됩니다.')) return

    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, date, passwd })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    router.push('/')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inline-block p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">잔류주 출사 신청</span>
        <textarea onChange={(event) => setReason(event.target.value)} className="mb-1 bg-gray-200 rounded-md w-full p-2" placeholder="출사 사유를 적어주세요. (최소 10자)"></textarea>

        <select onChange={(event) => setDate(event.target.value)} className="inline-block p-1 mt-2 shadow text-center rounded-md w-full bg-white">
          <option value="1">금요일 저녁 출사</option>
          <option value="0">토요일 오후 1시 출사</option>
        </select>
      </div>
      <div className="inline-block m-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">담임 선생님 비밀번호</span>
        <input required onChange={(event) => (setPasswd(event.target.value))} type="password" placeholder="비밀번호" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
      </div>

      <div className="inline-block px-10 w-full">
        <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">보내기</button>
      </div>
      <div className="inline-block px-10 my-5 w-full">
        <Link href="/"><button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">돌아가기</button></Link>
      </div>
    </form>
  )
}
