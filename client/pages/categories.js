import Head from 'next/head'
import { useContext, useState } from 'react'
import {DataContext} from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import { NotePencil, Trash } from 'phosphor-react'

const Categories = () => {
  const [name, setName] = useState('')
  const {state, dispatch} = useContext(DataContext) 
  const {categories, auth} = state

  const createCategory = async () => {
    if(auth.user.role !== 'admin') return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid'}})
    if(!name) return dispatch({type: 'NOTIFY', payload: {error: 'Name can not be left blank'}})

    dispatch({type: 'NOTIFY', payload: {loading: true}})
    const res = await postData('categories', {name}, auth.token)

    if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
    dispatch({type: 'ADD_CATEGORIES', payload: [...categories, res.newCategory]})
    return dispatch({type: 'NOTIFY', payload: {success: res.msg} })
  }

  return (
    <>
      <div>
        <Head>
          <title>
            Categories
          </title>
        </Head>
        <div>
          <input value={name} onChange={e=>setName(e.target.value)} />
          <button onClick={createCategory}>Add category</button>
          { categories.map(category => (
            <div key={category._id}>
              <div className="flex items-center" >
                <h1>{category.name}</h1>
                <NotePencil/>
                <Trash/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories