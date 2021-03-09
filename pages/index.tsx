import { verify } from 'jsonwebtoken'
import { parse } from 'cookieparser'
import { NextPageContext } from 'next';

export default function Home () {
  
}

export function getServerSideProps ({ req }: NextPageContext) {
  const { token } = parse(req.headers.cookie)
  if (!token) return { redirect: { destination: '/login', permanent: false } }
  else return {}
}
