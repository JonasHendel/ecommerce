import React, { useState } from 'react'
import { getData } from '../../utils/fetchData' 
import Head from 'next/head'
import ProductItem from '../../components/product/ProductItem'

function shop(props) {
  const [products, setProducts] = useState(props.products)

  console.log(products)

  return (
    <>
        <Head>
          <title>Shop</title>
        </Head>

        {
          products.length === 0 ? <h2>No products</h2>
          : products.map(product => (
            <ProductItem key={product._id} product={product}/>
          ))
        }
    </>
  )
}

export async function getServerSideProps() {
  const res = await getData('product')
  console.log(res)
  return {
    props: {
      products: res.products,
      result: res.result
    },
  }
}

export default shop
