import { useState } from 'react'
import Card from './Card'

export default function LoginForm () {
  const [id, setId] = useState('')
  const [passwd, setPasswd] = useState('')

  function setState (fn) {
    return function (event) {
      fn(event.target.value)
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id, passwd
      })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)

    document.cookie = `token=${res.token}`
    window.location.replace(res.redirect)
  }

  return (
    <form onSubmit={handleSubmit}>
        <Card>
          <span className="block mb-5">정심관 출사인원 관리 시스템 로그인</span>
          <input required onChange={setState(setId)} type="text" placeholder="ID, ex) 1101" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
          <input required onChange={setState(setPasswd)} type="password" placeholder="비밀번호" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
        </Card>
        <div className="inline-block px-10 my-5 w-full">
          <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">로그인!</button>
        </div>
      </form>
  )
}
