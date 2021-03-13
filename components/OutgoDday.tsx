import Card from '../components/Card'

interface Props {
  dday: number
}

export default function OutgoDday ({ dday }: Props) {
  return (
    <Card>
      <span className="block mb-1">다음 출사가능 일까지</span>
      <span className="block mb-5 font-bold text-red-500 text-3xl">D-{dday || 'Day'}</span>
    </Card>
  )
}
