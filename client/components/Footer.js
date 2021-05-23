import Link from 'next/link';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { InstagramLogo, FacebookLogo, Phone, At } from 'phosphor-react';

import FooterForm from './Newsletter/CustomForms';


const Footer = () => {
	const newsletterUrl = process.env.API_URL_MAILCHIMP;
  // console.log(`Newsletter url${newsletterUrl}`)
	return (
		<div className='bg-gray-800 bottom-0 w-full p-5 h-auto'>
			<div className='flex justify-between h-60 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-white'>
				<div className='flex flex-col justify-evenly w-60'>
					<Link href='/shop'>
						<div>
							<a>Shop</a>
						</div>
					</Link>
					<Link href='/salgsvilkår'>
						<div>
							<a>Salgsvilkår</a>
						</div>
					</Link>
					<Link href='/about'>
						<div>
							<a>Om meg</a>
						</div>
					</Link>
					<Link href='/kontakt'>
						<div>
							<a>Kontakt</a>
						</div>
					</Link>
				</div>
				<div className='flex flex-col justify-evenly text-3xl w-60'>
					<div className='flex items-center'>
						<At />
						<p className='text-base ml-2'>example@email.com</p>
					</div>
					<div className='flex items-center'>
						<Phone />
						<p className='text-base ml-2'>+47 987 231 123</p>
					</div>
					<div className='flex items-center'>
						<InstagramLogo />
						<p className='text-base ml-2'>@instagram</p>
					</div>
					<div className='flex items-center'>
						<FacebookLogo />
						<p className='text-base ml-2'>@facebook</p>
					</div>
				</div>
				<div className='flex flex-col justify-center'>
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
		</div>
	);
};

export default Footer;
