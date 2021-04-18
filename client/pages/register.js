//NPM
import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

//Project files
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'

//CSS
import styles from "../styles/SignIn.module.css"

function register() {
  const initialState = { name: "", email: "", password: "", cf_password: ""}
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password} = userData

  const [checked, setChecked] = useState()

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state 

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({type: 'NOTIFY', payload: {}})
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password)
    if(errMsg){
      return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
    }

    dispatch({type: 'NOTIFY', payload: {loading: true}})

    if(checked === 'on'){
      const res = await postData('subscribe', userData)
      if(res.err){
        dispatch({type: 'NOTIFY', payload: {error: res.err}})
      }
      dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    const res = await postData('auth/register', userData)

    if(res.err){
      return dispatch({type: 'NOTIFY', payload: {error: res.err}})
    }
    
    return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Register Page</title>
      </Head>

        <form className={styles.signinCard} onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input name="name" value={name} onChange={handleChangeInput} type="text" placeholder="Name"/>
          <input name="email" value={email} onChange={handleChangeInput} type="text" placeholder="Email"/>
          <input name="password" value={password} onChange={handleChangeInput} type="password" placeholder="Password" />
          <input name="cf_password" value={cf_password} onChange={handleChangeInput} type="password" placeholder="Confirm Password" />
          <input type="checkbox" onChange={(e)=>{setChecked(e.target.value)}}></input>
          <button className="submit-btn" type="submit">Register</button>
          <Link href="/signin">
            <a>Login</a>
          </Link>
        </form>
    </div>
  )
}

export default register