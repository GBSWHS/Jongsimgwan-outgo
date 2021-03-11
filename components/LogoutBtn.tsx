export default function LogoutBtn () {
  function logout () {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.reload()
  }

  return (
    <div className="inline-block px-10 my-5 w-full">
      <button onClick={logout} className="inline w-full align-top bg-red-500 text-white rounded-md shadow p-2">로그아웃</button>
    </div>
  )
}