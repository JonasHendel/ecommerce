import Link from 'next/link';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';

const Success = () => {
	const { state, dispatch } = useContext(DataContext);

	const router = useRouter();

	const { auth, tickets, course } = state;

	const { user } = auth;

	useEffect(async () => {
		dispatch({ type: 'NOTIFY', payload: { loading: true } });
		if (Object.keys(router.query).length && Object.keys(auth).length) {
			const query = router.query;

			let ticket;

			await postData('order/ticket', { query, course }, auth.token).then(
				async (res) => {
					ticket = res.newTicket;
					await dispatch({
						type: 'ADD_TICKETS',
						payload: [...tickets, res.newTicket],
					});
					postData(
						'mail/course',
						{ user, course, ticket },
						auth.token
					).then(() => {
						dispatch({ type: 'ADD_COURSE', payload: [] });
						dispatch({
							type: 'NOTIFY',
							payload: {},
						});
					});
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
				<p className='mt-5 text-gray-700 text-lg'>
					Vi har sendt deg en bekfrefteles på e-post. Hvis du ikke har
					mottatt denne, vennligst kontakt francescosolimeo@gmail.com
				</p>
				<p className="mt-2 text-lg text-gray-700'">
					Du kan også se dine bestillinger under "profil"
				</p>
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
