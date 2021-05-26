import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ApplyForm ({ grade }: { grade: number }) {
  const router = useRouter()

  const [fri, setFri] = useState('2')
  const [sat, setSat] = useState([false, false, false, false])
  const [sun, setSun] = useState([false, false, false, false])

  async function onSubmit (event) {
    event.preventDefault()

    const res = await fetch('/api/outgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: sat[1] || sun[0] || sun[1] ? prompt('외출을 선택하셨습니다.\n외출 행선지를 입력하세요.\n(예: 대구)')! : '', reason: sat[1] || sun[0] || sun[1] ? prompt('외출을 선택하셨습니다.\n외출 사유를 입력하세요\n(예: 동성로가서 놀꺼임)')! : '', fri, sat, sun })
    }).then((res) => res.json())

    if (!res.success) return alert(res.msg)
    router.push('/')
  }

  return (
    <form onSubmit={onSubmit} className="mb-10">
      <div className="inline-block max-w-sm mt-5 p-5 shadow text-center rounded-md w-10/12 bg-white">
        <span className="block mb-5">잔류주 출사 신청</span>

        {
          grade > 1
            ? (
            <>
              <br/><p>금요일</p>
              <div>
                <input className="ml-1" required type="radio" id="fri0" name="fri" value="0" onChange={(event) => setFri(event.target.value)}/>
                <label htmlFor="fri0">외출</label>

                <input className="ml-1" required type="radio" id="fri1" name="fri" value="1" onChange={(event) => setFri(event.target.value)}/>
                <label htmlFor="fri1">외박</label>

                <input className="ml-1" required type="radio" id="fri2" name="fri" value="2" onChange={(event) => setFri(event.target.value)}/>
                <label htmlFor="fri2">잔류</label>
              </div>
            </>
              )
            : <></>
        }

        <br/><p>토요일</p>
        <div>
          <input className="ml-1" type="checkbox" id="sat0" name="sat" value="0" onChange={() => { sat[0] = !sat[0]; setSat(sat) }}/>
          <label htmlFor="sat0">귀가</label>

          <input className="ml-1" type="checkbox" id="sat1" name="sat" value="1" onChange={() => { sat[1] = !sat[1]; setSat(sat) }}/>
          <label htmlFor="sat1">오후 외출</label>

          <input className="ml-1" type="checkbox" id="sat2" name="sat" value="2" onChange={() => { sat[2] = !sat[2]; setSat(sat) }}/>
          <label htmlFor="sat2">오후 동아리</label>

          <input className="ml-1" type="checkbox" id="sat3" name="sat" value="3" onChange={() => { sat[3] = !sat[3]; setSat(sat) }}/>
          <label htmlFor="sat3">오후 자습</label>
        </div>

        <br/><p>일요일</p>
        <div>
          <input className="ml-1" type="checkbox" id="sun0" name="sun" value="0" onChange={() => { sun[0] = !sun[0]; setSun(sun) }}/>
          <label htmlFor="sun0">오전 외출</label>

          <input className="ml-1" type="checkbox" id="sun1" name="sun" value="1" onChange={() => { sun[1] = !sun[1]; setSun(sun) }}/>
          <label htmlFor="sun1">오후 외출</label>

          <input className="ml-1" type="checkbox" id="sun2" name="sun" value="2" onChange={() => { sun[2] = !sun[2]; setSun(sun) }}/>
          <label htmlFor="sun2">잔류</label>

          <input className="ml-1" type="checkbox" id="sun3" name="sun" value="3" onChange={() => { sun[3] = !sun[3]; setSun(sun) }}/>
          <label htmlFor="sun3">복귀</label>
        </div>
      </div>
      <div>
        <div className="inline-block px-10 max-w-sm w-full">
          <button type="submit" className="inline w-full align-top bg-green-500 text-white rounded-md shadow p-2">보내기</button>
        </div>
        <div className="inline-block px-10 max-w-sm my-5 w-full">
          <Link href="/"><button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">돌아가기</button></Link>
        </div>
      </div>
    </form>
  )
}
