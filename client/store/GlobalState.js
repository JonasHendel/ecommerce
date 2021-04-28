//Npm
import { createContext, useReducer, useEffect } from 'react'

//Project files
import reducers from './Reducers'
import { getData } from '../utils/fetchData'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
  const initialState = {notify:{}, auth: {}, cart: [], modal: {}}
  const [state, dispatch] = useReducer(reducers, initialState)

  const { cart } = state

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

  return(
    <DataContext.Provider value={{state, dispatch}}>
        {children}
    </DataContext.Provider>
  )
}

