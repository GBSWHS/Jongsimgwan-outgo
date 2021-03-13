export default function Card ({ children }: any) {
  return (
    <div className="inline-block m-5 p-10 shadow text-center rounded-md w-10/12 bg-white">
      {children}
    </div>
  )
}
