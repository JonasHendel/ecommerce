import Head from 'next/head';
import { GraduationCap, ShoppingBag } from 'phosphor-react';
import Link from 'next/link';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import {HomeForm} from '../components/Newsletter/CustomForms'

import { useState, useEffect } from 'react';

import Carousel from '../components/Carousel';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

export default function Home() {
	const newsletterUrl = process.env.API_URL_MAILCHIMP;
	const [userEmail, setUserEmail] = useState('');

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	useEffect(() => {
		if (auth.user) {
			setUserEmail(auth.user.email);
		}
	}, [auth]);

	let email;
	const submit = (e) => {
		e.preventDefault();

		try {
			email &&
				email.value.indexOf('@') > -1 &&
				onValidated(
					{
						EMAIL: email.value,
					},
					dispatch({
						type: 'NOTIFY',
						payload: {
							success: 'Success! Subscribed to newsletter.',
						},
					})
				);
		} catch (err) {
			dispatch({ type: 'NOTIFY', payload: { error: err.message } });
		}
	};

	return (
		<div>
			<Head>
				<title>Francesco Solimeo</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 flex flex-col'>
				<div className='w-full h-500 flex justify-center mt-10'>
					<img
						className='w-800 h-500 object-cover rounded-xl shadow-even'
						src='https://res.cloudinary.com/devhendel/image/upload/v1623173506/fs_media/dev099evd4yhri4nyphi.jpg'
					/>
				</div>
				<div className='flex justify-evenly'>
					<Link href='/shop'>
						<div className='flex flex-col items-center w-22rem shadow-even border-gray-900 rounded-xl mt-10 cursor-pointer'>
							<h1 className='font-bold text-4xl mt-3 h-1/5'>
								Nettbutikk
							</h1> 
							<div className='flex items-center'>
								<p className='font-semibold text-gray-600 text-xl w-1/2 pl-10'>
									Her finner du alt fra ... til ...
								</p>
								<ShoppingBag size={150} />
							</div>
						</div>
					</Link>
					<Link href='/course'>
						<div className='flex flex-col items-center w-22rem shadow-even border-gray-900 rounded-xl mt-10 cursor-pointer'>
							<h1 className='font-bold text-4xl mt-3 h-1/5'>Kurs</h1>
							<div className='flex items-center'>
								<p className='font-semibold text-gray-600 text-xl w-1/2 pl-10'>
									Her kan du kjøpe billetter for kurs
								</p>
								<GraduationCap size={150} />
							</div>
						</div>
					</Link>
					<div className='flex flex-col items-center w-22rem h-60 shadow-even border-gray-900 rounded-xl mt-10 '>
						<h1 className='font-bold text-4xl mt-3 h-1/5'>Newsletter</h1>
          <div className="flex flex-grow">
						<MailchimpSubscribe
						url={newsletterUrl}
						render={({ subscribe, status, message }) => (
							<HomeForm
								status={status}
								message={message}
								onValidated={(formData) => subscribe(formData)}
							/>
						)}
					/>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
}
