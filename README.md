# GBSWHS/Jongsimgwan-outgo
경북소프트웨어고등학교 정심관(기숙사) 잔류 인원 확인 시스템

## why
기숙사의 원칙은 2주에 한번씩 출사가 가능하도록 되어있다.\
하지만 학원이 있거나 일정이 잡혀있는 등 매주마다 나가야되는 사람들이 생겼다.\
그래서 교장쌤이 나보고 남고 싶은 사람과 나갈 사람을 구분할 시스템을 만들라고 하셨다.\
이런, 야근 확정

## what
![Preview](https://cdn.discordapp.com/attachments/812599432327069708/820201005580156928/Peek_2021-03-13_16-45.gif)

![Excel](https://cdn.discordapp.com/attachments/530043751901429762/820204142303772692/unknown.png)

기능:
* 출사 가능 날짜 확인
* 출사 신청 및 출사 신청 취소
* 로그인 및 초기 비밀번호 설정
* 구글 스프레드시트 연동으로 효율적으로 확인 가능

특징:
* 모바일 중심의 직관적인 UI
* NextJS와 Tailwind.css를 이용, 빠른 사이트 속도


## how
설치 및 실행 방법을 서술한다.

### 준비물
* `Nodejs`와 `yarnpkg`
* `mysql` 혹은 `mariadb`
* 구글 스프레드시트 api키
* 기본적인 쉘 사용능력

### 코드 다운로드
오른쪽 위 코드 다운로드 버튼을 눌러도 되지만 git을 사용하는것을 추천한다:
```
git clone https://github.com/GBSWHS/Jongsimgwan-outgo.git
cd Jongsimgwan-outgo
```

### 구글 스프레드시트 api 설정
다음 경로에 구글 IAM에서 제공하는 api키를 배치한다:
```
backend/data/googleauth.json
```

![ex](https://cdn.discordapp.com/attachments/530043751901429762/820207500527665152/unknown.png)

### 구성요소 설치
코드를 다운로드한 폴더에 터미널(쉘/프롬포트 등)을 열고 다음을 입력해 구성요소를 설치한다:
```
yarn
cd backend
yarn
```

### 데이터베이스 설정
유저 생성 권한이 있는 데이터베이스 쉘에 접속한후 다음을 입력한다:
```
source database.sql
```

### JWT 토큰 설정
JWT 토큰 생성에 사용될 시크릿을 다음 경로와 형식으로 입력한다:
```sh
# .env.local
JWT_TOKEN=사용할시크릿
```

![ex](https://cdn.discordapp.com/attachments/530043751901429762/820209944624103434/unknown.png)

### 컴파일
다음을 입력해 `Next.js` 컴파일을 진행한다:
```
cd ..
yarn build
```

### 실행
다음을 입력해 컴파일한 파일들을 실행한다:
```
yarn start -p 접속포트
```

또한 스프레드시트와 연동을 위해 다음을 다른 터미널에서 실행한다:
```
cd backend
node index.js
```
