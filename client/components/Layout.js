import React, { useContext } from 'react'
// import LogRocket from 'logrocket';

import { DataContext } from '../store/GlobalState'

import NavBar from './NavBar'
import Notify from './Notify'

function Layout({children}) {

  const {state} = useContext(DataContext)


  // LogRocket.init('xfw64p/francesco-site');

  // if(state.auth.user) {
  //   LogRocket.identify('user', {
  //     name: state.auth.user.name,
  //     email: state.auth.user.email,
  //   });
  // }


  
  return (
    <div>
        <NavBar/>
        <Notify/>
        {children}
    </div>
  )
}

export default Layout
