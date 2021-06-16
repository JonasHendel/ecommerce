import React, { useState } from 'react';

import emailjs from 'emailjs-com';

import styles from '../styles/Contact.module.css';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const ContactForm = ({ event }) => {
	const initialState = {
		user_name: '',
		user_email: '',
		subject: event.title,
		date: '',
		persons: '',
		location: '',
		message: '',
	};

	const [emailInfo, setEmailInfo] = useState(initialState);

	const { user_name, user_email, subject, message } = emailInfo;
	const { dispatch } = useContext(DataContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEmailInfo({ ...emailInfo, [name]: value });
		
	};

	const sendEmail = (e) => {
    setEmailInfo({
			...emailInfo,
			message: `Hei, jeg vil gjerne booke deg den ${emailInfo.date}. Vi er ${emailInfo.persons} personer. Stedet vi vil at du skal være er ${emailInfo.location}.`,
		});
    console.log(e.target)
		e.preventDefault();
		dispatch({ type: 'NOTIFY', payload: { loading: true } });

		emailjs
			.sendForm('test', 'template1', e.target, process.env.USER_EMAILJS)
			.then(
				(result) => {
					dispatch({
						type: 'NOTIFY',
						payload: { success: 'E-mailen er sendt, du kommer til å høre fra meg innen få dager!' },
					});
					setEmailInfo(initialState);
				},
				(error) => {
					dispatch({
						type: 'NOTIFY',
						payload: { error: 'Det oppsto en feil, prøv igjen senere' },
					});
				}
			);
	};

	return (
		<>
			<div>
				<form
					className='p-8 mt-8 md:mr-8 h-40rem flex flex-col justify-evenly'
					onSubmit={sendEmail}>
					<h1 className='font-bold text-xl'>Book meg!</h1>
					<input type='hidden' name='contact_number' />
					<div className='flex justify-between'>
						<input
							className='w-2/5 mb-2 border-2 border-gray-900 border-md rounded-md p-2'
							value={user_name}
							onChange={handleChange}
							type='text'
							name='user_name'
							placeholder='Navn'
							required
						/>
						<input
							className='w-3/6 mb-2 border-2 border-gray-900 border-md rounded-md p-2'
							value={user_email}
							onChange={handleChange}
							type='email'
							name='user_email'
							placeholder='Email'
							required
						/>
					</div>
					<input
						className='mb-2 border-2 border-gray-900 border-md rounded-md p-2'
						onChange={handleChange}
						type='text'
						name='subject'
						placeholder='Subject'
						value={event.title}
						required/>
					<div>
						<p>
							Hei, jeg vil gjerne booke deg den{' '}
							<input
								type='date'
								className='mb-2 border-2 border-gray-900 border-md rounded-md p-2'
								value={emailInfo.date}
								onChange={handleChange}
								name='date'
                required
							/>
							. <br />
							Vi er{' '}
							<input
								type='number'
								className='mb-2 border-2 border-gray-900 border-md rounded-md p-2'
								value={emailInfo.persons}
								onChange={handleChange}
								name='persons'
                placeholder="Antall personer"
                required
							/>{' '}
							personer.
							<br />
							Stedet vi vil at du skal være er{' '}
							<input
								type='text'
								className='mb-2 border-2 border-gray-900 border-md rounded-md p-2'
								value={emailInfo.location}
								onChange={handleChange}
								name='location'
                placeholder="Sted"
                required
							/>
							.
						</p>
            <input
            className="hidden"
              value={emailInfo.message}
              name="message"
            />
					</div>
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
