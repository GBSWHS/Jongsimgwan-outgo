import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from './Card'

interface Props {
  canGo: boolean
  isGo: boolean
  reason?: string
}

export default function OutgoState ({ canGo, isGo, reason }: Props) {
  const router = useRouter()

  async function abortOutGo () {
    if (!confirm('출사 요청을 취소하시겠습니까?')) return
    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: '임태현 천재다 ㅋㅋ루' })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    alert('성공적으로 출사 요청을 취소하였습니다.')
    
    router.reload()
  }

  const isGoElement =
    isGo
      ? <span className="block mb-5 font-bold text-green-500 text-xl">신청됨 (사유: {reason})</span>
      : <span className="block mb-5 font-bold text-gray-500 text-xl">신청되지 않음</span>

  const canGoElement =
    canGo
      ? ( isGo
        ? <button onClick={abortOutGo} className="inline w-full align-top bg-red-300 rounded-md shadow p-2">신청 취소</button>
        : <Link href="/apply"><button className="inline w-full align-top bg-green-300 rounded-md shadow p-2">출사 신청</button></Link> )
      : <button className="inline w-full align-top bg-gray-300 rounded-md shadow p-2 cursor-default" disabled>신청 불가 (의무 출사주)</button>

  return (
    <Card>
      <span className="block mb-1">출사 신청 여부</span>
      {isGoElement}
      {canGoElement}
    </Card>
  )
}