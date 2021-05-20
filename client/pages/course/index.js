import React from 'react'
import Course from '../../components/Course'

import {getData} from '../../utils/fetchData'


const courseOverview = ({content}) => {
  return (
    <div className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8">
      {content.map((course)=>(
        <Course key={course.id} content={course}/>
      ))}
    </div>
  )
}

export default courseOverview


export async function getServerSideProps() {
  const res = await getData('course')
  // console.log(res)
  return{
    props:{
      status: res.status,
      content: res.content
    }
  }
}