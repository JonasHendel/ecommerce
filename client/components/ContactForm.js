import React, { useState } from 'react';

import emailjs from 'emailjs-com';

import styles from '../styles/Contact.module.css';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const ContactForm = () => {
	const initialState = {
		user_name: '',
		user_email: '',
		subject: '',
		message: '',
	};

	const [emailInfo, setEmailInfo] = useState(initialState);

	const { user_name, user_email, subject, message } = emailInfo;
	const { dispatch } = useContext(DataContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEmailInfo({ ...emailInfo, [name]: value });
		console.log(emailInfo);
	};

	const sendEmail = (e) => {
    e.preventDefault();
		dispatch({ type: 'NOTIFY', payload: { loading: true } });

		emailjs
			.sendForm('test', 'template1', e.target, process.env.USER_EMAILJS)
			.then(
				(result) => {
					dispatch({
						type: 'NOTIFY',
						payload: { success: 'Success! Email was sent.' },
					});
					setEmailInfo(initialState);
				},
				(error) => {
					dispatch({
						type: 'NOTIFY',
						payload: { error: 'Error, try again later' },
					});
				}
			);
	};

	return (
		<>
			<div>
				<form
					className='p-8 mt-8 mr-8 w-50rem h-40rem flex flex-col justify-evenly shadow-even rounded-xl'
					onSubmit={sendEmail}>
					<h1 className='font-bold text-xl'>Send meg en Epost!</h1>
					<input type='hidden' name='contact_number' />
					<div className='flex justify-between'>
						<input
							className='w-2/5 mb-2 border-4 border-gray-900 border-md rounded-md p-2'
							value={user_name}
							onChange={handleChange}
							type='text'
							name='user_name'
							placeholder='Name'
							required
						/>
						<input
							className='w-3/6 mb-2 border-4 border-gray-900 border-md rounded-md p-2'
							value={user_email}
							onChange={handleChange}
							type='email'
							name='user_email'
							placeholder='Email'
							required
						/>
					</div>
					<input
						className='mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						value={subject}
						onChange={handleChange}
						type='text'
						name='subject'
						placeholder='Subject'
						required
					/>
					<textarea
						className='h-2/5 mb-2 border-4 border-gray-900 border-md rounded-md p-2'
						value={message}
						onChange={handleChange}
						name='message'
						placeholder='Message'
						required
					/>
					<div className='flex justify-end'>
						<button
							className='bg-gray-900 text-white h-12 w-28 rounded-md'
							type='submit'
							value='Send'>
							Send
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactForm;
