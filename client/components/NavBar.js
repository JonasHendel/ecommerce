import Link from 'next/link'
import { ShoppingCart, User } from 'phosphor-react'
import React from 'react'
import styles from '../styles/NavBar.module.css'

import { useRouter } from 'next/router'



const NavBar = () => {
  const router = useRouter

  const isActive = (r) => {
    if(r === router.pathname){
      return { color: 'red' } 
    }else {
      return ''
    }
  }
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
          <div className="flex-end">
            <Link href="/cart">
              <a >
                <ShoppingCart size={30}/> 
              </a>
            </Link>
            <Link href="/signin">
              <a>
                <User size={30} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar