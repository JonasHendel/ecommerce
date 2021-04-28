//NPM
import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

//CSS
import styles from '../styles/Cart.module.css'


// Project Files
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import { getData } from '../utils/fetchData'

function cart() {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [total, setTotal] = useState(0)

  useEffect(()=>{
    const getTotal = () => {
      const res = cart.reduce((prev, item)=> {
        return prev + (item.price*item.quantity)
      }, 0)
      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__solimeo'))
    if(cartLocal && cartLocal.length > 0){
      let newArr = []
      const updateCart = async () => {
        for(const item of cartLocal){
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock } = res.product
          if(inStock > 0){
            newArr.push({
              _id, title, images, price, inStock,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }
        dispatch({type: 'ADD_CART', payload: newArr })
      }
      updateCart() 
    }
  }, [])

  if( cart.length === 0 ){
    return <h1>Cart is empty</h1>
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.contentArea}>
          <div className={styles.cart}>
            <h1>Handlekurv</h1>
            <table>
              <tbody>
                {cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart= {cart}/>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <form>
              <h2>Shipping</h2>
              <input className="" type="next" name="address" id="address" placeholder="Address"/>
              <input className="" type="next" name="mobile" id="mobile" placeholder="Mobile"/>
            </form>
            <h3>Total: NOK {total}</h3>
            <Link href={auth.user ? '#' : '/signin'}>
              <button className="submit-btn">Proceed with payment</button>
            </Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default cart
