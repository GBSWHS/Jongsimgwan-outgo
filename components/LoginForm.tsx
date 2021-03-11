import { useState } from 'react'

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
    window.location.replace('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inline-block m-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">정심관 잔류 요청 로그인</span>
        <input required onChange={setState(setId)} type="text" placeholder="아이디" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
        <input required onChange={setState(setPasswd)} type="password" placeholder="비번" className="mb-1 bg-gray-200 rounded-md w-full p-2"/>
      </div>
      <div className="inline-block px-10 my-5 w-full">
        <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">로그인!</button>
      </div>
    </form>
  )
}
