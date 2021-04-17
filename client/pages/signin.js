//NPM
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

//CSS
import styles from "../styles/SignIn.module.css"

function signin() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign-in Page</title>
      </Head>

        <form className={styles.signinCard}>
          <h1>Sign in</h1>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password" />
          <button className="submit-btn" type="submit">Login</button>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </form>
    </div>
  )
}

export default signin
