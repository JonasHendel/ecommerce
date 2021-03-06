import React, {useContext} from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

function Notify() {
  const {state, dispatch}  = useContext(DataContext)
  const { notify } = state
  return (
    <>
      {notify.loading && <Loading/>}
      {notify.error && <Toast message={{error: true, msg: notify.error}} handleShow={()=>{dispatch({ type: "NOTIFY", payload: {} })}}/>}
      {notify.success && <Toast message={{error: false, msg: notify.success}} handleShow={()=>{dispatch({ type: "NOTIFY", payload: {} })}}/>}
    </>
  )
}

export default Notify
