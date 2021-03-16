import Link from 'next/link'
import Card from './Card'

interface Props {
  canGo: boolean
  isGo: boolean
  reason?: string
  dday: number
  student: number
}

export default function OutgoState ({ canGo, isGo, reason, dday, student }: Props) {
  const isGoElement =
      student || dday > 5
        ? (isGo
            ? <span className="block mb-5 font-bold text-green-500 text-xl break-normal">신청됨 (사유: {reason})</span>
            : <span className="block mb-5 font-bold text-gray-500 text-xl">신청되지 않음</span>)
        : <span className="block mb-5 font-bold text-gray-500 text-xl">신청 불가</span>

  const canGoElement =
  student || dday > 5
    ? (canGo
        ? (isGo
            ? <Link href="/abort"><button className="inline w-full align-top bg-red-300 rounded-md shadow p-2">신청 취소</button></Link>
            : <Link href="/apply"><button className="inline w-full align-top bg-green-300 rounded-md shadow p-2">출사 신청</button></Link>)
        : <button className="inline w-full align-top bg-gray-300 rounded-md shadow p-2 cursor-default" disabled>신청 불가 (의무 출사주)</button>)
    : <button className="inline w-full align-top bg-gray-300 rounded-md shadow p-2 cursor-default" disabled>신청 불가</button>

  return (
    <Card>
      <span className="block mb-1">출사 신청 여부</span>
      {isGoElement}
      {canGoElement}
    </Card>
  )
}
