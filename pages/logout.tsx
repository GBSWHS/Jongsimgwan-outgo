import { useRouter } from 'next/router'
import Container from '../components/Container'
import Footer from '../components/Footer'

export default function LogoutPage () {
  const router = useRouter()

  main()

  async function main () {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/login')
  }

  return <Container><Footer /></Container>
}
