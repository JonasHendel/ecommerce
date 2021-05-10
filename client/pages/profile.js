import Head from 'next/head'
import { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'

const Profile = () => {
  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const initialState = {
    avatar: '',
    name: '',
    password: '',
    cf_password: '',
  }
  const [data, setData] = useState(initialState)
  const { avatar, name, password, cf_password } = data

  if(!auth.user) return null;
  return(
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8">
        <h1>Profile</h1>
        <h2>{auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}</h2>
        <img src={auth.user.avatar}/>
      </div>
    </>
  )
}

export default Profile