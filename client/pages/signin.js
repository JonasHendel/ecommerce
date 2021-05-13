//NPM
import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

//Project files
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';


function signin() {
	const initialState = { email: '', password: '' };
	const [userData, setUserData] = useState(initialState);
	const { email, password } = userData;

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

		dispatch({ type: 'NOTIFY', payload: { loading: true } });

		const res = await postData('auth/login', userData);

		if (res.err) {
			return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
		}

		dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
		dispatch({
			type: 'AUTH',
			payload: {
				token: res.access_token,
				user: res.user,
			},
		});

		Cookie.set('refreshtoken', res.refresh_token, {
			path: 'api/auth/accessToken',
			expires: 7,
		});
		localStorage.setItem('firstLogin', true);
		router.back();
	};
	return (
		<div className='max-w-6xl h-screen flex justify-center mx-auto px-2 sm:px-6 lg:px-8'>
			<Head>
				<title>Sign-in Page</title>
			</Head>
			<form className='shadow-even w-2/5 min-w-400 h-2/5 rounded-2xl mt-20 flex flex-col justify-evenly items-center' onSubmit={handleSubmit}>
				<h1 className="font-bold text-xl">Sign in</h1>
        <div className="flex flex-col items-center">
          <input
            className="mb-2 border-4 border-gray-900 border-md rounded-md p-2"
            type='text'
            name='email'
            value={email}
            onChange={handleChangeInput}
            placeholder='Email'
          />
          <input
            className="border-4 border-black border-md rounded-md p-2"
            type='password'
            name='password'
            value={password}
            onChange={handleChangeInput}
            placeholder='Password'
          />
        </div>
        <div className="flex flex-col items-center">
				<button className='h-12 w-28 mb-4 bg-gray-900 text-white rounded-lg' type='submit'>
					Login
				</button>
        <div>
          <a>You don't have an account? </a>
          <Link href='/register'>
            <a className="underline">Register</a>
          </Link>
        </div>
        </div>
			</form>
		</div>
	);
}

export default signin;
