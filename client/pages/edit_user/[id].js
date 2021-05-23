import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';
import { patchData } from '../../utils/fetchData';
import { updateItem } from '../../store/Actions';

const EditUser = () => {
	const router = useRouter();
	const { id } = router.query;

	const { state, dispatch } = useContext(DataContext);
	const { auth, users } = state;

	const [editUser, setEditUser] = useState([]);
	const [checkAdmin, setCheckAdmin] = useState(false);

	useEffect(() => {
		users.forEach((user) => {
			if (user._id === id) {
				setEditUser(user);
				setCheckAdmin(user.role === 'admin' ? true : false);
			}
		});
	}, [users]);

	const handleChange = () => {
		setCheckAdmin(!checkAdmin);
	};

	const handleSubmit = () => {
		let role = checkAdmin ? 'admin' : 'user';
		dispatch({ type: 'NOTIFY', payload: { loading: true } });
		patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
			if (res.err){
				return dispatch({ type: 'NOTIFY', payload: { err: res.err } });
      }

			dispatch(
				updateItem(users, editUser._id, {
					...editUser,
					role,
				}, 'ADD_USERS')
			);
			return dispatch({ type: 'NOTIFY', payload: { success: res.msg }});
		});
	};

	return (
		<div>
			<Head>
				<title>Edit User</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<button onClick={() => router.back()}>Return</button>
				<div>
					<h2>Edit User</h2>
					<div>
						<lable htmlFor='name'>Name</lable>
						<input
							type='text'
							id='name'
							defaultValue={editUser.name}
							disabled={true}
						/>
					</div>
					<div>
						<lable htmlFor='email'>Email</lable>
						<input
							type='text'
							id='email'
							defaultValue={editUser.email}
						/>
					</div>
					<div>
						<lable htmlFor='isAdmin'>is admin</lable>
						<input
							type='checkbox'
							id='isAdmin'
							checked={checkAdmin}
							onChange={handleChange}
						/>
					</div>
					<button onClick={handleSubmit}>Update</button>
				</div>
			</div>
		</div>
	);
};
export default EditUser;
