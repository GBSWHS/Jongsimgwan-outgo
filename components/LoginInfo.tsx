import { UserData } from '../interface/UserData'

interface Props {
  user: UserData
}

export default function LoginInfo ({ user }: Props) {
  return (
    <div>
      {user.grade}학년 {user.class}반 {user.nickname}님으로 로그인 됨
    </div>
  )
}
