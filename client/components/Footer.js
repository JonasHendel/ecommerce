import Link from 'next/link';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { InstagramLogo, FacebookLogo, Phone, At } from 'phosphor-react';

import {FooterForm} from './Newsletter/CustomForms';


const Footer = () => {
	const newsletterUrl = process.env.API_URL_MAILCHIMP;
  // console.log(`Newsletter url${newsletterUrl}`)
	return (
		<div className='bg-gray-800 bottom-0 w-full p-5 h-auto'>
			<div className='flex justify-between h-60 max-w-7xl mx-auto px-2  sm:px-6 lg:px-8 text-white'>
				<div className='flex flex-col justify-evenly w-60'>
					<Link href='/shop'>
						<div className="cursor-pointer">
							<a>Shop</a>
						</div>
					</Link>
					<Link href='/salgsvilkår'>
						<div className="cursor-pointer">
							<a>Salgsvilkår</a>
						</div>
					</Link>
					<Link href='/about'>
						<div className="cursor-pointer">
							<a>Om meg</a>
						</div>
					</Link>
					<Link href='/contact'>
						<div className="cursor-pointer">
							<a>Kontakt</a>
						</div>
					</Link>
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
					<a href='https://www.instagram.com' target='_blank'>
					<div className='flex items-center'>
						<InstagramLogo />
						<p className='text-base ml-2'>@instagram</p>
					</div>
          </a>
					<a href='https://www.facebook.com' target='_blank'>
					<div className='flex items-center'>
						<FacebookLogo />
						<p className='text-base ml-2'>@facebook</p>
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
		</div>
	);
};

export default Footer;
