import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx);

      return {
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <html lang="nl-Nl">
        <Head>
            <link rel="shortcut icon" href="/static/favicon.png" />
            <meta name="theme-color" content="#e9c46a" />
            <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </html>
    )
  }
}
