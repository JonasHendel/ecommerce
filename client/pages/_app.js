import '../styles/globals.css'

import Layout from '../components/Layout'

import { DataProvider } from '../store/GlobalState'  

import  ReactGa from 'react-ga'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    ReactGa.initialize('G-QRSCQJW7N1')

    ReactGa.pageview('/')
  }, [])

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
