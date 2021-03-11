import { useState } from 'react'
import { useRouter } from 'next/router'

export default function OutgoForm () {
  const router = useRouter()
  const [reason, setReason] = useState('')

  function setState (fn) {
    return function (event) {
      fn(event.target.value)
    }
  }

  async function handleSubmit (event) {
    event.preventDefault()

    if (!confirm('출사를 신청하시겠습니까?')) return
    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason
      })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    alert('성공적으로 출사를 신청하였습니다.')
    return router.reload()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input required onChange={setState(setReason)} type="text" placeholder="출사 사유 (최소 10자)"/>
      <button type="submit">출사 요청!</button>
    </form>
  )
}
