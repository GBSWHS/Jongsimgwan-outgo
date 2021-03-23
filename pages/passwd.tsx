import Container from '../components/Container'
import Footer from '../components/Footer'
import PasswdForm from '../components/PasswdForm'
import Scroller from '../components/Scroller'

export default function PasswdPage () {
  return (
    <Container>
      <Scroller>
        <PasswdForm />
      </Scroller>
      <Footer />
    </Container>
  )
}
