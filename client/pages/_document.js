import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render(){
    return(
      <Html lang="no">
        <Head>
          <meta name="description" content="Personal website with courses, blog and shop"/>
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
