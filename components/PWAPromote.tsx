import { useEffect, useRef, useState } from 'react'

export default function PWAPromote () {
  const [pwaEnabled, setPWAEnable] = useState(false)
  const deferredPrompt = useRef(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setPWAEnable(true)
    })
  })

  function installApp () {
    if (!deferredPrompt.current) return false
    deferredPrompt.current.prompt()
  }

  return (
    <div className={(pwaEnabled ? 'inline-block' : 'hidden') + ' m-5 p-5 shadow text-center rounded-md w-10/12 bg-gradient-to-br from-purple-400 to-blue-500 text-white'}>
      <span className="font-bold">홈 화면에서 간단히 실행해 보세요</span>

      <div className="inline-block px-10 mt-5 w-full">
        <button onClick={installApp} className="inline w-full align-top bg-gray-200 text-black rounded-md shadow p-2">홈 화면에 추가하기</button>
      </div>
    </div>
  )
}
