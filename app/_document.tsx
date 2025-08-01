// src/pages/_document.tsx

import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" href="/favicon-32x32.png" />
        {/* Outras meta tags globais podem ir aqui */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
