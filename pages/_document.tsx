import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="ko">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.png"/>

          <meta name="og:site_name" content="jongsimgwan outgo"/>
          <meta property="og:title" content="정심관 출사 관리 시스템"/>
          <meta property="og:image" content="https://avatars.githubusercontent.com/u/77792158" />
          <meta property="og:description" content="Made By GBSWHS 01 SD"/>

          <meta name="theme-color" content="#ACCFFF"/>
          <meta name="twitter:card" content="summary"/>

          <link rel="apple-touch-icon" href="/icons/icons-192.png"/>
          <link rel="apple-touch-icon" href="/icons/icons-512.png"/>

          <meta name="apple-mobile-web-app-status-bar" content="#ACCFFF" />
        </Head>

        <body>
          <Main />
          <NextScript />
          <script src="app.js"></script>
        </body>
      </Html>
    )
  }
}
