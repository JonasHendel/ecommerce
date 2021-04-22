import Head from 'next/head';

import { useState, useEffect } from 'react'

import Newsletter from '../components/Newsletter'

import styles from '../styles/Home.module.css';

export default function Home() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if(!sessionStorage.getItem("disablePopup")){
      setTimeout(()=>{
        setActive(true)
      }, 5000)
    }
  },[])

	return (
		<div>
			<Head>
				<title>Francesco</title>
				<link rel='icon' href='../public/favicon.ico' />
			</Head>
      <div className={styles.container}>
      <div className={styles.contentArea}>
        {active && <div className="newsletter">
            <Newsletter setActive={setActive}/>
          </div>
        }
          <div className={styles.text}>
            <h1>Francesco solimeo</h1>
            <h4>Pizza Chef og eier av Vesuvio Cafe</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquam vulputate nibh risus, in mollis orci elementum sed.
              Fusce mi lorem, blandit tristique turpis et, efficitur
              faucibus quam. Cras condimentum ut justo ut pellentesque.
              Nulla condimentum justo vel elit porta vehicula. Proin non
              iaculis enim. Quisque ac metus non tortor accumsan finibus
              tincidunt a augue. Praesent imperdiet pretium ipsum, vel
              viverra libero facilisis vitae. Fusce imperdiet fermentum
              dolor.
            </p>
          </div>
          <div className={styles.image}>
            <img src="/logo.png" alt="logo"/>
          </div>
        </div>
      </div>
		</div>
	);
}
