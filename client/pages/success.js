import Link from 'next/link';
import { ArrowLeft } from 'phosphor-react';
import { useEffect } from 'react';
import {useContext} from 'react'
import { DataContext } from '../store/GlobalState'

const Success = () => {
  const {state, dispatch}  = useContext(DataContext)

  useEffect(()=>{
    localStorage.removeItem('__next__cart01__solimeo')
    dispatch({ type: 'ADD_CART', payload: []})
  }, [])



	return (
		<div className='flex flex-col h-screen items-center'>
			<div className='flex mt-60 flex-col items-center p-12 py-16 bg-gray-100 rounded-md shadow-xl'>
				<h1 className='text-green-400 text-5xl font-extrabold'>
					Takk for din bestilling!
				</h1>
				<Link href='/'>
					<div className='flex items-center mt-9 cursor-pointer'>
						<ArrowLeft />
						<a >Tilbake</a>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Success;
