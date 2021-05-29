import React from 'react'
import Course from '../components/Course'

import {getData} from '../utils/fetchData'


const Kurs = ({content}) => {
  return (
    <div className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8">
      {content.map((course)=>(
        <ProductItem product={coures} />
      ))}
    </div>
  )
}

export default kurs


export async function getServerSideProps() {
  const res = await getData('content/course')
  // console.log(res)
  return{
    props:{
      status: res.status,
      content: res.content
    }
  }
}