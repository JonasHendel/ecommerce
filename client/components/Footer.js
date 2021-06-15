import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { InstagramLogo, FacebookLogo, Phone, At } from 'phosphor-react';

import Link from 'next/link';
import { FooterForm } from './Newsletter/CustomForms';

const Footer = () => {
	const newsletterUrl = process.env.API_URL_MAILCHIMP;
	// `Newsletter url${newsletterUrl}`)
	return (
		<footer className='bg-gray-800 bottom-0 w-full p-5 h-auto'>
			<div className='flex justify-between h-60 max-w-7xl mx-auto px-2  sm:px-6 lg:px-8 text-white'>
				<div className='flex flex-col justify-evenly w-60'>
					<div className='cursor-pointer'>
						<Link href='/shop'>
							<a>Shop</a>
						</Link>
					</div>
					<div className='cursor-pointer'>
						<Link href='/salgsvilkar'>
							<a>Salgsvilkår</a>
						</Link>
					</div>
					<div className='cursor-pointer'>
						<Link href='/about'>
							<a>Om meg</a>
						</Link>
					</div>
					<div className='cursor-pointer'>
						<Link href='/contact'>
							<a>Kontakt</a>
						</Link>
					</div>
				</div>
				<div className='flex flex-col justify-evenly text-3xl w-60'>
					<Link href='/contact'>
						<div className='flex items-center cursor-pointer'>
							<At />
							<p className='text-base ml-2'>example@email.com</p>
						</div>
					</Link>
					<div className='flex items-center'>
						<Phone />
						<p className='text-base ml-2'>+47 987 231 123</p>
					</div>
					<a
						href='https://www.instagram.com/vesuvio_cafe/'
						target='_blank'
						rel='noopener'>
						<div className='flex items-center'>
							<InstagramLogo />
							<p className='text-base ml-2'>@vesuvio_cafe</p>
						</div>
					</a>
					<a
						href='https://www.facebook.com/vesuviocafeoslo/'
						target='_blank'
						rel='noopener'>
						<div className='flex items-center'>
							<FacebookLogo />
							<p className='text-base ml-2'>@vesuviocafeoslo</p>
						</div>
					</a>
				</div>
				<div className='hidden sm:flex flex-col justify-center'>
					<MailchimpSubscribe
						url={newsletterUrl}
						render={({ subscribe, status, message }) => (
							<FooterForm
								status={status}
								message={message}
								onValidated={(formData) => subscribe(formData)}
							/>
						)}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
