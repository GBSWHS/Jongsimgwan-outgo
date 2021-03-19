import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Card from './Card'

export default function LoginForm () {
  const router = useRouter()
  const [passwd, setPasswd] = useState('')
  const [check, setCheck] = useState('')

  function setState (fn) {
    return function (event) {
      fn(event.target.value)
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    if (passwd !== check) return alert('입력된 두 비밀번호가 일치하지 않습니다')

    const res = await fetch('/api/passwd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passwd
      })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    router.push(res.redirect)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <span className="block text-lg">비밀번호 변경</span>
        <span className="block text-sm mb-5">첫 로그인시 비밀번호 변경이 필요합니다</span>
        <input required onChange={setState(setPasswd)} type="password" placeholder="비밀번호" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
        <input required onChange={setState(setCheck)} type="password" placeholder="비밀번호 확인" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
      </Card>
      <div className="inline-block px-10 my-5 w-full">
        <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">변경</button>
      </div>
      <div className="inline-block px-10 my-5 w-full">
        <Link href="/"><button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">다음에 변경</button></Link>
      </div>
    </form>
  )
}
