import Container from '../components/Container'
import ApplyForm from '../components/ApplyForm'
import Footer from '../components/Footer'
import Card from '../components/Card'
import useSWR from 'swr'
import Scroller from '../components/Scroller'

const fetcher = (url: string) => fetch(url).then(r => r.json())
export default function ApplyPage () {
  const { data, error } = useSWR('/api/status', fetcher)

  if (!data) return <Container><Card>로딩중...</Card></Container>
  if (error) return <Container><span className="text-red">에러: {error}</span></Container>

  return (
    <Container>
      <Scroller>
        <ApplyForm grade={data.user.grade} />
      </Scroller>
      <Footer />
    </Container>
  )
}
