import LoginForm from "../components/LoginForm";

export default function LoginPage () {
  return (
    <div className="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden">
      <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}
