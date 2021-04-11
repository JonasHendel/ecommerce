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
          <Link href="/">
            <a >Hjem</a>
          </Link>
          <Link href="/kurs" >
            <a>Kurs</a>
          </Link>
          <Link href="/shop">
            <a >Shop</a>
          </Link>
          <Link href="/events">
            <a >Events/aktuelt</a>
          </Link>
          <Link href="/about">
            <a >Om meg</a>
          </Link>
          <Link href="/kontakt">
            <a >Kontakt</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NavBar