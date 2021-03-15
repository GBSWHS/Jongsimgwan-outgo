import Card from '../components/Card'
import moment from 'moment'

interface Props {
  dday: number
}

export default function OutgoDday ({ dday }: Props) {
  return (
    <Card>
      <span className="block mb-1">다음 출사가능 일까지</span>
      <span className="block mb-2 font-bold text-black text-1xl">{moment().add(dday, 'd').format('YYYY년 MM월 DD일')}</span>
      <span className="block mb-5 font-bold text-red-500 text-3xl">D-{dday || 'Day'}</span>
    </Card>
  )
}
