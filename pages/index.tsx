import { parse } from 'cookieparser'
import { NextPageContext } from 'next';

export default function Home () {
  return (
    <div>
      Hello World!
    </div>
  )
}

export function getServerSideProps ({ req }: NextPageContext) {
  if (!req.headers.cookie) return { redirect: { destination: '/login', permanent: false } }
  const { token } = parse(req.headers.cookie)
  if (!token) return { redirect: { destination: '/login', permanent: false } }
  else return { props: {} }
}
