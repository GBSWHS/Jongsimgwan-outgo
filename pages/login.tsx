import Container from '../components/Container'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import PWAPromote from '../components/PWAPromote'
import Scroller from '../components/Scroller'

export default function LoginPage () {
  return (
    <Container>
      <Scroller>
        <PWAPromote />
        <LoginForm />
      </Scroller>
      <Footer />
    </Container>
  )
}
