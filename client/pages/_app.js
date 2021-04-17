import '../styles/globals.css'

import Layout from '../components/Layout'

import { DataProvider } from '../store/GlobalState'  

function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  )
}

export default MyApp
