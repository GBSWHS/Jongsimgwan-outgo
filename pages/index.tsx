import Container from "../components/Container";
import OutgoState from '../components/OutgoState';
import OutgoDday from '../components/OutgoDday';
import Footer from '../components/Footer';
import LogoutBtn from '../components/LogoutBtn';
import LoginInfo from '../components/LoginInfo';
import useSWR from "swr";
import Card from "../components/Card";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then(r => r.json())
export default function Home () {
  const router = useRouter()
  const { data, error } = useSWR('/api/status', fetcher)

  if (!data) return <Container><Card>로딩중...</Card></Container>
  if (error) return <Container><span className="text-red">에러: {error}</span></Container>

  const { redirect, dday, reason, canGo, isGo, user } = data
  if (redirect) {
    router.push(redirect)
    return <Container><Card>로딩중...</Card></Container>
  }

  return (
    <Container>
      <OutgoDday dday={dday}/>
      <OutgoState reason={reason} canGo={canGo} isGo={isGo}/>
      <LoginInfo user={user} />
      <LogoutBtn />

      <Footer />
    </Container>
  )
}
