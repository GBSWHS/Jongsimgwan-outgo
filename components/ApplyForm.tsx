import { useState } from "react"
import { useRouter } from 'next/router'

export default function ApplyForm () {
  const router = useRouter()
  const [reason, setReason] = useState('')
  async function onSubmit (event) {
    event.preventDefault()

    if (!confirm('출사를 신청하시겠습니까?\n이 출사 요청은 사감 선생님께 전송됩니다.')) return
    
    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    router.push('/')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inline-block m-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">잔류주 출사 신청</span>
        <textarea onChange={(event) => setReason(event.target.value)} className="mb-1 bg-gray-200 rounded-md w-full p-2" placeholder="출사 사유 (최소 10자)"></textarea>
      </div>
      <div className="inline-block px-10 my-5 w-full">
        <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">보내기</button>
      </div>
    </form>
  )
}