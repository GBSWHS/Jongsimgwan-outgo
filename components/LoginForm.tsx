import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginForm () {
  const router = useRouter()
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
      <input required onChange={setState(setId)} type="text" placeholder="아이디"/>
      <input required onChange={setState(setPasswd)} type="password" placeholder="비번"/>
      <button type="submit">로그인!</button>
    </form>
  )
}
