import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'

function Filter({state}) {
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')

  const {categories} = state
  const router = useRouter()

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({router, category: e.target.value})
  }

  return (
      <div className="flex justify-between mt-10">
        <select className="border-4 border-gray-900 rounded-lg" value={category} onChange={handleCategory}>
          <option value='all'>All categories</option>
         { categories.map(item => (
           <option value={item._id}>{item.name}</option>
         ))} 
        </select>
        <form className="w-3/5 h-12 flex justify-center border-4 border-gray-900 border-md rounded-lg" autoCorrect="off">
          <input className="w-4/5 border-r-4 border-gray-900" type="text" placeholder="Search" list="title_product" value={search.toLowerCase()}/>

          <datalist id="title_product">
            <option value="name">Title Name</option>
          </datalist>

          <button className="w-1/5" type="submit">Search</button>
        </form>

        <select className="border-4 border-gray-900 rounded-lg" value={sort}>
           <option value="-createdAt">Newest</option>
           <option value="oldest">Oldest</option>
           <option value="-sold">Best sellers</option>
           <option value="-price">Price: High-Low</option>
           <option value="-price">Price: Low-High</option>
        </select>
      </div>
  )
}

export default Filter
