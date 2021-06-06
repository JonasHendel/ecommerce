import {postData} from '../utils/fetchData'
import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'

const Mail = () => {
  const {state} = useContext(DataContext)
  const {auth} = state
  const handleSend = () => {
    postData('mail', auth.user, auth.token).then(res => console.log(res))
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <button className="bg-gray-900 text-white rounded-md p-10" onClick={handleSend}>Send Mail</button>
    </div>
  )
}

export default Mail