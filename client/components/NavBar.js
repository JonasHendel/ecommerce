import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navItems}>
          <div className={styles.navLogo}>
            <img src="/logo.png" alt="logo"/>
          </div>
          <Link href="">
            <a >Hjem</a>
          </Link>
          <Link href="" >
            <a>Kurs</a>
          </Link>
          <Link href="">
            <a >Shop</a>
          </Link>
          <Link href="">
            <a >Events/aktuelt</a>
          </Link>
          <Link href="">
            <a >Om meg</a>
          </Link>
          <Link href="">
            <a >Kontakt</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NavBar