import React, { useContext } from 'react'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'

function cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  if( cart.length === 0 ){
    return <h1>Cart is empty</h1>
  }

  return (
    <div>
    <h1>
      Cart
    </h1>
    </div>
  )
}

export default cart
