import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, FormControl } from 'react-bootstrap'

export default function LoginPage () {
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

    if (res.status !== 200) return alert(res.msg)
    
    document.cookie = `token=${res.token}`
    router.push('/')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl required onChange={setState(setId)} type="text" placeholder="아이디"/>
      <FormControl required onChange={setState(setPasswd)} type="password" placeholder="비번"/>
      <Button type="submit">로그인!</Button>
    </Form>
  )
}
