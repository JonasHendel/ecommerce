import '../styles/globals.css'

import NavBar from '../components/NavBar'
import Grid from '../components/Grid'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <NavBar/>
      {/* <Grid/> */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
