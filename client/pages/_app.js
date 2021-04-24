import '../styles/globals.css'

import Layout from '../components/Layout'

import { DataProvider } from '../store/GlobalState'  

import * as gtag from '../lib/gtag'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(()=>{
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
