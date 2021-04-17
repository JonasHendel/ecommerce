//NPM
import React, {useState, useContext} from 'react'
import Head from 'next/head'
import Link from 'next/link'

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

  const [state, dispatch] = useContext(DataContext)

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({type: 'NOTIFY', payload: {}})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password)
    if(errMsg){
      return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
    }
    dispatch({type: 'NOTIFY', payload: {loading: true}})

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
          <input name="email" value={email} onChange={handleChangeInput} type="email" placeholder="Email"/>
          <input name="password" value={password} onChange={handleChangeInput} type="password" placeholder="Password" />
          <input name="cf_password" value={cf_password} onChange={handleChangeInput} type="password" placeholder="Confirm Password" />
          <button className="submit-btn" type="submit">Register</button>
          <Link href="/signin">
            <a>Login</a>
          </Link>
        </form>
    </div>
  )
}

export default register