import Link from 'next/link'

export default function Footer () {
  return (
    <div className="bg-gray-600 w-full p-4 text-white absolute inset-x-0 bottom-0">
      &copy; 2021. GBSWHS. <span className="border-b-2 border-dotted"><Link href="/etc/credits">Credits</Link></span>
    </div>
  )
}
