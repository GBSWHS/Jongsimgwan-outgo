import Link from 'next/link'

export default function LogoutBtn () {
  return (
    <div className="inline-block px-10 my-5 w-full">
      <Link href="/logout">
        <button className="inline w-full align-top bg-red-500 text-white rounded-md shadow p-2">로그아웃</button>
      </Link>
    </div>
  )
}
