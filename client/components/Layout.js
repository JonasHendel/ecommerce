import React, { useContext } from 'react'
// import LogRocket from 'logrocket';

import { DataContext } from '../store/GlobalState'

import NavBar2 from './Navbar/NavBar2'
import Notify from './Notify'
import Footer from './Footer'

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
        <NavBar2/>
        <Notify/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout
