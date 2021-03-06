import Head from 'next/head';
import { GraduationCap, Martini } from 'phosphor-react';
import Link from 'next/link';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { HomeForm } from '../components/Newsletter/CustomForms';

import { useState, useEffect } from 'react';

import ImageSlider from '../components/slider/ImageSliderHome';
import { SliderData } from '../components/slider/SliderData';

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
				<title>Pizzachef Francesco Solimeo</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 flex flex-col'>
      <div className="w-full text-center mt-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold">Pizzachef Francesco Solimeo</h1>
      </div>
				<div className='w-full flex justify-center mt-20'>
					<ImageSlider slides={SliderData} />
				</div>
       
				<div className='flex flex-wrap items-center justify-evenly mt-20 mb-5'>
					<Link href='/shop'>
						<div className='flex flex-col items-center w-22rem h-60 shadow-even mb-5 border-gray-900 rounded-xl cursor-pointer'>
							<h2 className='font-bold text-4xl mt-3 h-1/5'>
								Pizzaevent
							</h2>
							<div className='flex items-center'>
								<p className='font-semibold text-gray-600 text-xl w-1/2 pl-10'>
									Vi kommer til ditt event og lager pizza!
								</p>
								<Martini size={150} />
							</div>
						</div>
					</Link>
					<Link href='/course'>
						<div className='flex flex-col items-center w-22rem h-60 shadow-even mb-5 border-gray-900 rounded-xl cursor-pointer'>
							<h2 className='font-bold text-4xl mt-3 h-1/5'>
								Pizzakurs
							</h2>
							<div className='flex items-center'>
								<p className='font-semibold text-gray-600 text-xl w-1/2 pl-10'>
									Har du lyst til ?? lage ekte italiensk pizza?
								</p>
								<GraduationCap size={150} />
							</div>
						</div>
					</Link>
					<div className='flex flex-col items-center w-22rem h-60 shadow-even mb-5 border-gray-900 rounded-xl '>
						<h2 className='font-bold text-4xl mt-3 h-1/5'>
							Newsletter
						</h2>
						<div className='flex flex-grow'>
							<MailchimpSubscribe
								url={newsletterUrl}
								render={({ subscribe, status, message }) => (
									<HomeForm
										status={status}
										message={message}
										onValidated={(formData) =>
											subscribe(formData)
										}
									/>
								)}
							/>
						</div>
					</div>
				</div> 
        <div className="flex justify-center text-center mt-5 mb-20">
      <p className="text-3xl w-3/6 font-bold text-gray-500 m">L??r hvordan man lager ekte italiensk pizza eller bestill et pizzaevent hvor vi baker pizza ved ditt event, for ditt event!</p>
        </div>
			</div>
		</div>
	);
}
