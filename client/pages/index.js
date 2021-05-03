import Head from 'next/head';
import { Car } from 'phosphor-react';

import { useState, useEffect } from 'react'

import Carousel from '../components/Carousel'

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
				<title>Francesco Solimeo</title>
				<link rel='icon' href='../public/favicon.ico' />
			</Head>
      <div className={styles.container}>
          <Carousel/>
      </div>
		</div>
	);
}
