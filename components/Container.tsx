export default function Container ({ children }: any) {
  return (
    <div className="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden text-center bg-gray-100 h-screen">
      <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto h-full">
        {children}
      </div>
    </div>
  )
}
