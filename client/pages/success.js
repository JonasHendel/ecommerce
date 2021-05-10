import Link from 'next/link';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import { useEffect } from 'react/cjs/react.development';

const Success = () => {
	const { state, dispatch } = useContext(DataContext);

  const router = useRouter()

  useEffect(() => {
    if (Object.keys(router.query).length) {
      postData('order/decreaseInStock', router.query)
    }
  }, [router.query])
  
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
