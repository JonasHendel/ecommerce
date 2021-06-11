import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { useRouter } from 'next/router';
import { patchData } from '../../../utils/fetchData';
import { updateItem } from '../../../store/Actions';
import { ArrowLeft } from 'phosphor-react'

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
			if (res.err) {
				return dispatch({ type: 'NOTIFY', payload: { err: res.err } });
			}

			dispatch(
				updateItem(
					users,
					editUser._id,
					{
						...editUser,
						role,
					},
					'ADD_USERS'
				)
			);
			return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
		});
	};

  if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}

	return (
		<div>
			<Head>
				<title>Edit User</title>
			</Head>
			<div className='max-w-7xl h-screen flex justify-center mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='h-96 px-10 mt-20 shadow-even rounded-xl flex flex-col justify-start'>
        <div className="mt-6 mb-6">
					<button className="flex items-center" onClick={() => router.back()}> <ArrowLeft className="mr-2"/>Return</button>
        </div>
					<div className='flex flex-col justify-between items-center w-full'>
						<div className='mb-4'>
							<h2 className='font-bold'>Edit User</h2>
						</div>
						<div className='mb-2 flex items-center w-full justify-between'>
							<lable htmlFor='name'>Name: </lable>
							<input
								className='rounded-md p-3 bg-gray-200 w-4/6'
								type='text'
								id='name'
								defaultValue={editUser.name}
								disabled={true}
							/>
						</div>
						<div className='mb-2 flex items-center w-full justify-between'>
							<lable htmlFor='email'>Email: </lable>
							<input
								className='border-4 border-gray-900 border-md rounded-md p-2  w-4/6'
								type='text'
								id='email'
								defaultValue={editUser.email}
							/>
						</div>
						<div className="mb-10 flex items-center w-full justify-between">
							<lable htmlFor='isAdmin'>Admin:</lable>
              <div className="w-4/6 flex justify-center">
							<input
              className="w-4 h-4 "
								type='checkbox'
								id='isAdmin'
								checked={checkAdmin}
								onChange={handleChange}
							/>
              </div>
						</div>
						<button className="px-4 py-2 bg-gray-900 text-white rounded-lg" onClick={handleSubmit}>Update</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default EditUser;
