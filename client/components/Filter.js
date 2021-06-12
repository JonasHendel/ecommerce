import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import { getData } from '../utils/fetchData'

export function ProductFilter({state}) {
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
  
  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({router, sort: e.target.value})
  }


  useEffect(()=>{
    filterSearch({router, search: search ? search.toLowerCase() : 'all'})
  }, [search])

  return (
      <div className="flex justify-between mt-10">
        <form className="w-3/5 mr-2 h-12 flex justify-center border-4 border-gray-900 border-md rounded-lg" autoComplete="off">
          <input className="w-full border-gray-900 pl-2" type="text" placeholder="Search" list="title_product" onChange={e => setSearch(e.target.value)} value={search.toLowerCase()}/>
        </form>
        <select className="border-4 w-1/5 mr-2 border-gray-900 rounded-lg pl-3" value={category} onChange={handleCategory}>
          <option value='all'>Categories</option>
         { categories.map(item => (
           <option key={item._id} value={item._id}>{item.name}</option>
         ))} 
        </select>

        <select className="border-4 w-1/5 border-gray-900 rounded-lg pl-2" value={sort} onChange={handleSort}>
           <option value="-createdAt">Newest</option>
           <option value="oldest">Oldest</option>
           <option value="-sold">Best sellers</option>
           <option value="-price">Price: High-Low</option>
           <option value="price">Price: Low-High</option>
        </select>
      </div>
  )
}

export function RecipeFilter({state}) {
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
  
  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({router, sort: e.target.value})
  }


  useEffect(()=>{
    filterSearch({router, search: search ? search.toLowerCase() : 'all'})
  }, [search])

  return (
      <div className="flex justify-between mt-10">
        <form className="w-4/5 mr-2 h-12 flex justify-center border-4 border-gray-900 border-md rounded-lg" autoComplete="off">
          <input className="w-full border-gray-900 pl-2" type="text" placeholder="Search" list="title_product" onChange={e => setSearch(e.target.value)} value={search.toLowerCase()}/>
        </form>

        <select className="border-4 w-1/5 border-gray-900 rounded-lg pl-2" value={sort} onChange={handleSort}>
           <option value="-createdAt">Newest</option>
           <option value="oldest">Oldest</option>
           <option value="-sold">Best sellers</option>
           <option value="-price">Price: High-Low</option>
           <option value="price">Price: Low-High</option>
        </select>
      </div>
  )
}
