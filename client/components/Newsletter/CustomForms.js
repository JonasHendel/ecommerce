import { DataContext } from '../../store/GlobalState';
import { useContext, useState } from 'react';
import { useEffect } from 'react';

export const FooterForm = ({ status, message, onValidated, setActive }) => {
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
		if (status === 'error') {
			dispatch({
				type: 'NOTIFY',
				payload: {
					error: `Error: ${message}`,
				},
			});
		}
	};

	return (
		<>
			<form
				className='flex flex-col justify-center h-full'
				onSubmit={submit}>
				<div>
					<h1 className='text-lg w-60'>
						Abonner min newsletter!
					</h1>
				</div>
				<input
					className='text-black rounded-lg p-2 w-60 focus:outline-none'
					ref={(node) => (email = node)}
					type='email'
					placeholder='Din epost addresse'
					defaultValue={userEmail}
				/>
				<button
					className='border-2 border-gray-50 p-2 my-2 rounded-lg w-60 focus:outline-none active:bg-white'
					type='submit'>
					Abonner
				</button>
			</form>
			<br />
			<div>
				{status === 'error' && (
					<div>
						{message.includes('already subscribed') ? (
							<p>Already subscribed!</p>
						) : (
							<p>{message}</p>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export const HomeForm = ({ status, message, onValidated, setActive }) => {
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
		if (status === 'error') {
			dispatch({
				type: 'NOTIFY',
				payload: {
					error: `Error: ${message}`,
				},
			});
		}
	};
	return (
		<form
			onSubmit={submit}
			className='flex flex-col items-center justify-evenly'>
			<p className='font-semibold text-gray-600 text-base w-5/6'>
				Abonner min newsletter for å få oppdateringer på e-post!
			</p>
			<input
				className='w-5/6 border-4 border-gray-900 rounded-md h-10 pl-2'
				ref={(node) => (email = node)}
				type='email'
				placeholder='Din epost addresse'
				defaultValue={userEmail}
			/>
			<div className='w-5/6 flex justify-end mt-2'>
				<button
					type='submit'
					className='h-12 w-28 mb-2 bg-gray-900 text-white rounded-lg'>
					Abonner!
				</button>
			</div>
		</form>
	);
};
