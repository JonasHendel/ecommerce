//Npm
import { createContext, useReducer, useEffect } from 'react'

//Project files
import reducers from './Reducers'
import { getData } from '../utils/fetchData'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
  const initialState = {notify:{}, auth: {}, cart: [], modal: [], orders: [], users: [], tickets: [], categories: [], course: {}}
   
  const [state, dispatch] = useReducer(reducers, initialState)

  const { cart, auth, course } = state

  useEffect(()=>{
     const firstLogin = localStorage.getItem("firstLogin")
     if(firstLogin){
       getData('auth/accessToken').then(res => {
         if(res.err) return localStorage.removeItem("firstLogin")

         dispatch({
           type: "AUTH",
           payload: {
             token: res.access_token,
             user: res.user
           }
         })
       })
       getData('categories').then(res => {
        if(res.err) return dispatch({type: 'NOTIFY', payload:{error: res.err} })

        dispatch({
          type: "ADD_CATEGORIES",
          payload: res.categories 
        })
      })
     }
  },[])

  useEffect(()=> {
    const __next__cart01__solimeo = JSON.parse(localStorage.getItem('__next__cart01__solimeo'))
    if(__next__cart01__solimeo){
      dispatch({type: 'ADD_CART', payload: __next__cart01__solimeo})
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem('__next__cart01__solimeo', JSON.stringify(cart))
  }, [cart])

  useEffect(()=> {
    const course_ls = JSON.parse(localStorage.getItem('course_ls'))
    if(course_ls){
      dispatch({type: 'ADD_COURSE', payload: course_ls})
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem('course_ls', JSON.stringify(course))
  }, [course])

  useEffect(()=>{
      if(auth.token){
        getData('order/cart', auth.token).then(res => {
          if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
          dispatch({type: 'ADD_ORDERS', payload: res.orders})
        })
        getData('order/course', auth.token).then(res=>{
          if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
          dispatch({type: 'ADD_TICKETS', payload: res.tickets})
        })
        if(auth.user.role === 'admin'){
          getData('user', auth.token).then(res => { 
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({type: 'ADD_USERS',payload: res.users})
          })
        }
      }else{
        dispatch({type: 'ADD_ORDERS', payload: []})
        dispatch({type: 'ADD_USERS', payload: []})
        dispatch({type: 'ADD_TICKETS', payload: []})
      }
  }, [auth.token])

  return(
    <DataContext.Provider value={{state, dispatch}}>
        {children}
    </DataContext.Provider>
  )
}

