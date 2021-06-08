// Npm installs
import React, { useState } from 'react';
import { Phone, InstagramLogo, At } from 'phosphor-react';
import Head from 'next/head'
// Components
import ContactForm from '../components/ContactForm';

const Kontakt = () => {
	return (
		<>
    <Head>
      <title>Contact Page</title>
    </Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 flex-col items-center'>
				<h1 className='mt-5 text-center font-bold text-3xl'>KONTAKT</h1>
				<div className='flex'>
					<ContactForm />
					<div className='mt-8 flex flex-col justify-evenly w-96 h-40rem shadow-even rounded-xl'>
						<div className='flex justify-center'>
							<div className='flex flex-col items-center text-xl font-bold'>
								<Phone className='text-7xl' />
								<p>+47 980 56 823</p>
							</div>
						</div>
						<div className='flex justify-center'>
							<div className='flex flex-col items-center text-xl font-bold'>
								<At className='text-7xl' />
								<p>test@mail.com</p>
							</div>
						</div>
						<div className='flex justify-center'>
							<div className='flex flex-col items-center text-xl font-bold'>
								<InstagramLogo className='text-7xl' />
								<p>@francescosolimeo</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Kontakt;
