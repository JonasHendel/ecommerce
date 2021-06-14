import Link from 'next/link';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';

const Success = () => {
	const { state, dispatch } = useContext(DataContext);

	const router = useRouter();

	const { cart, auth, orders } = state;

	const { user } = auth;

	useEffect(async () => {
		if (Object.keys(router.query).length && Object.keys(auth).length) {
			dispatch({ type: 'NOTIFY', payload: { loading: true } });
			const query = router.query;

			let order;

			await postData('order/order', { query, cart }, auth.token).then(
				async (res) => {
					order = res.newOrder;
					await dispatch({
						type: 'ADD_ORDERS',
						payload: [...orders, res.newOrder],
					});
					postData('mail/cart', { user, order }, auth.token).then(
						() => {
							dispatch({ type: 'ADD_CART', payload: [] });
							dispatch({ type: 'NOTIFY', payload: {} });
						}
					);
				}
			);
		}
	}, [auth]);

	return (
		<div className='flex flex-col h-screen items-center'>
			<div className='flex mt-60 flex-col items-center p-12 py-16 bg-gray-100 rounded-md shadow-xl'>
				<h1 className='text-green-400 text-5xl font-extrabold'>
					Takk for din bestilling!
				</h1>
				<p className='mt-5 text-gray-700'>
					Vi har sendt deg en bekfrefteles på e-post. Hvis du ikke har
					mottatt denne, vennligst kontakt francescosolimeo@gmail.com
				</p>
				<p>Du kan også se dine bestillinger under "profil"</p>
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
