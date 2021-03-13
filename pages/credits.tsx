import Link from 'next/link'
import Card from '../components/Card'
import Container from '../components/Container'
import Footer from '../components/Footer'

export default function CCPage () {
  return (
    <Container>
      <div className="overflow-y-scroll h-screen">
        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">제작자</span>
          <span>소프트웨어과 1기 입학생 박민혁, 임태현</span>
        </Card>

        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">작업소</span>
          <span>경북SW고 정심관 1층 &quot;Lab 3&quot; 외 3곳</span>
        </Card>

        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">제작기간</span>
          <span>2021년 3월 10일부터 4일간</span>
        </Card>

        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">아이디어 제공</span>
          <span>경북SW고 교장선생님</span>
        </Card>

        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">사용한 프레임워크</span>
          <span>React, NextJS (with TypeScript <span className="text-blue-700">&#9829;</span>)</span>
        </Card>

        <Card>
          <span className="block mb-5 border-b-2 pb-3 text-xl font-bold">오픈소스 정보</span>
          <a className="text-blue-500 underline font-bold" href="https://github.com/GBSWHS/Jongsimgwan-outgo">이곳</a>에서 확인 가능
        </Card>

        <div className="inline-block px-10 mb-32 w-full">
          <Link href="/"><button className="inline w-full align-top bg-gray-500 text-white rounded-md shadow p-2">돌아가기</button></Link>
        </div>
      </div>

      <Footer />
    </Container>
  )
}
