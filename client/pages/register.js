//NPM
import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Project files
import valid from '../utils/valid';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

function register() {
	const initialState = { name: '', email: '', password: '', cf_password: '' };
	const [userData, setUserData] = useState(initialState);
	const { name, email, password, cf_password } = userData;

	const [checked, setChecked] = useState();

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const router = useRouter();

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		dispatch({ type: 'NOTIFY', payload: {} });
	};

	useEffect(() => {
		if (Object.keys(auth).length !== 0) router.push('/');
	}, [auth]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errMsg = valid(name, email, password, cf_password);
		if (errMsg) {
			return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
		}

		dispatch({ type: 'NOTIFY', payload: { loading: true } });

		if (checked === 'on') {
			const res = await postData('subscribe', userData);
			if (res.err) {
				dispatch({ type: 'NOTIFY', payload: { error: res.err } });
			}
			dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
		}

		const res = await postData('auth/register', userData);

		if (res.err) {
			return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
		}

		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	return (
		<div className='max-w-6xl h-screen flex justify-center mx-auto px-2 sm:px-6 lg:px-8'>
			<Head>
				<title>Register Page</title>
			</Head>
			<form
				className='shadow-even w-2/5 min-w-400 h-3/5 rounded-2xl mt-20 flex flex-col justify-evenly items-center'
				onSubmit={handleSubmit}
			>
				<h1 className='font-bold text-xl'>Register</h1>
				<div className='flex flex-col items-center'>
					<input
						className='mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						name='name'
						value={name}
						onChange={handleChangeInput}
						type='text'
						placeholder='Name'
					/>
					<input
						className='mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						name='email'
						value={email}
						onChange={handleChangeInput}
						type='text'
						placeholder='Email'
					/>
					<input
						className='mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						name='password'
						value={password}
						onChange={handleChangeInput}
						type='password'
						placeholder='Password'
					/>
					<input
						className='mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						name='cf_password'
						value={cf_password}
						onChange={handleChangeInput}
						type='password'
						placeholder='Confirm Password'
					/>
					<div className="flex mt-4 items-center">
						<input
            className="mr-2"
							type='checkbox'
							onChange={(e) => {
								setChecked(e.target.value);
							}}
						/>
            <p className="font-semibold">Newsletter</p>
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<button
						className='h-12 w-28 mb-4 bg-gray-900 text-white rounded-lg'
						type='submit'
					>
						Register
					</button>
					<div>
						<a className='text-gray-500'>
							Already have an account?{' '}
						</a>
						<Link href='/signin'>
							<a className='underline'>Login</a>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default register;

{
	/* <input
						name='name'
						value={name}
						onChange={handleChangeInput}
						type='text'
						placeholder='Name'
					/>
					<input
						name='email'
						value={email}
						onChange={handleChangeInput}
						type='text'
						placeholder='Email'
					/>
					<input
						name='password'
						value={password}
						onChange={handleChangeInput}
						type='password'
						placeholder='Password'
					/>
					<input
						name='cf_password'
						value={cf_password}
						onChange={handleChangeInput}
						type='password'
						placeholder='Confirm Password'
					/>
					<input
						type='checkbox'
						onChange={(e) => {
							setChecked(e.target.value);
						}}
					/> */
}
