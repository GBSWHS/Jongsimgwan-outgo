import { useRouter } from 'next/router'
import Container from '../components/Container'
import Footer from '../components/Footer'

export default function AbortPage () {
  const router = useRouter()

  main()

  async function main () {
    if (!confirm('출사 요청을 취소하시겠습니까?')) return
    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: '임태현 천재다 ㅋㅋ루' })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    alert('성공적으로 출사 요청을 취소하였습니다.')

    router.push('/')
  }

  return <Container><Footer /></Container>
}
