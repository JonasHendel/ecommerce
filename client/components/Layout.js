import React, { useContext } from 'react'
// import LogRocket from 'logrocket';

import { DataContext } from '../store/GlobalState'

import NavBar2 from './Navbar/N'
import Notify from './Notify'
import Modal from './Modal'
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
        <Modal/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout
