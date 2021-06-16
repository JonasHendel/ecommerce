import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { XCircle, CheckCircle } from 'phosphor-react';
import { useRouter } from 'next/router';

import Order from '../components/OrderTable';
import { DataContext } from '../store/GlobalState';
import valid from '../utils/valid';
import { patchData } from '../utils/fetchData';

const Profile = () => {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const { auth, notify, orders, tickets } = state;

	const initialState = {
		avatar: '',
		name: '',
		password: '',
		cf_password: '',
	};
	const [data, setData] = useState(initialState);
	const { name, password, cf_password } = data;

	useEffect(() => {
		if (auth.user) {
			setData({ ...data, name: auth.user.name });
		}
	}, [auth.user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
		dispatch({ type: 'NOTIFY', payload: {} });
	};
	const handleUpdateProfile = (e) => {
		e.preventDefault();
		if (password) {
			const errMsg = valid(name, auth.user.email, password, cf_password);
			if (errMsg)
				return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
			updatePassword();
			setData({ ...initialState, name });
		}
		if (name !== auth.user.name) updateName();
	};

	const updatePassword = () => {
		patchData('user/updatePassword', { password }, auth.token).then(
			(res) => {
				if (res.err)
					return dispatch({
						type: 'NOTIFY',
						payload: { error: res.msg },
					});
				return dispatch({
					type: 'NOTIFY',
					payload: { success: res.msg },
				});
			}
		);
	};

	const updateName = () => {
		patchData('user', { name }, auth.token).then((res) => {
			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.msg },
				});
			dispatch({
				type: 'NOTIFY',
				payload: { toke: auth.token, user: res.user },
			});
			return dispatch({
				type: 'NOTIFY',
				payload: { success: res.msg },
			});
		});
	};

	if (!auth.user)
		return (
			<div className="flex justify-center h-screen">
				<h1 className="mt-20 font-bold text-3xl">Vennligst logg inn, for å se profilen din!</h1>
			</div>
		);
	return (
		<div>
			<Head>
				<title>Profil</title>
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
				<div className='flex flex-col lg:flex-row items-center lg:items-start justify-between mt-20 h-full'>
					<div className='lg:w-2/6 h-1/2 w-4/5 flex flex-col'>
						<h1 className='text-3xl font-bold mb-2'>
							{auth.user.role === 'user'
								? 'Bruker Profil'
								: 'Admin Profil'}
						</h1>
						<form className='flex  flex-col justify-evenly h-full'>
							<div className='flex items-center w-full justify-between'>
								<label className='font-bold mr-2'>Navn: </label>
								<input
									className='border-2 border-black border-md rounded-md p-2 mb-4'
									type='text'
									placeholder='Ditt navn'
									name='name'
									value={name}
									onChange={handleChange}
								/>
							</div>
							<div className='flex items-center w-full justify-between mb-4'>
								<label className='font-bold mr-2'>
									Email:{' '}
								</label>
								<input
									className='rounded-md p-3 bg-gray-200'
									type='text'
									defaultValue={auth.user.email}
									disabled={true}
								/>
							</div>
							<div className='flex items-center w-full justify-between mb-4'>
								<label className='font-bold mr-2'>
									Nytt passord:{' '}
								</label>
								<input
									className='border-2 border-black border-md rounded-md p-2'
									type='password'
									placeholder='Nytt passord'
									name='password'
									value={password}
									onChange={handleChange}
								/>
							</div>
							<div className='flex items-center w-full justify-between mb-4'>
								<label className='font-bold mr-2'>
									Bekreft passord:{' '}
								</label>
								<input
									className='border-2 border-black border-md rounded-md p-2'
									type='password'
									placeholder='Bekreft passord'
									name='cf_password'
									value={cf_password}
									onChange={handleChange}
								/>
							</div>
							<button
								className='h-14 mb-4 bg-gray-900 text-white rounded-lg'
								type='submit'
								onClick={handleUpdateProfile}>
								Oppdater
							</button>
						</form>
					</div>
					<div className='flex flex-col w-4/5 lg:w-3/5'>
						<Order items={orders} title='bestillinger' />
						<Order items={tickets} title='billetter' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
