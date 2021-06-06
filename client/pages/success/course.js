import Link from 'next/link';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import emailjs from 'emailjs-com'

const Success = () => {
	const { state, dispatch } = useContext(DataContext);

  const router = useRouter()

  const {auth, tickets, course} = state

  const {user} = auth

  useEffect(async() => {
    if (Object.keys(router.query).length && Object.keys(auth).length) {

      const query = router.query
      
      let ticket

      await postData('order/course', {query, course}, auth.token).then(async(res)=>{
        ticket = res.newTicket
        await dispatch({ type: 'ADD_TICKETS', payload: [...tickets, res.newTicket]})
        postData('mail', {user, course, ticket}, auth.token).then(() => {
          dispatch({ type: 'ADD_COURSE', payload: []})
        })
      }
      )
    }
  }, [auth])
  
	return (
		<div className='flex flex-col h-screen items-center'>
			<div className='flex mt-60 flex-col items-center p-12 py-16 bg-gray-100 rounded-md shadow-xl'>
				<h1 className='text-green-400 text-5xl font-extrabold'>
					Takk for din bestilling!
				</h1>
				<Link href='/'>
					<div className='flex items-center mt-9 cursor-pointer'>
						<ArrowLeft />
						<a>Tilbake</a>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Success;
