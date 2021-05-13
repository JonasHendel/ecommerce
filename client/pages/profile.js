import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import valid from '../utils/valid'
import {patchData} from '../utils/fetchData'


const Profile = () => {
	const { state, dispatch } = useContext(DataContext);
	const { auth, notify } = state;

	const initialState = {
		avatar: '',
		name: '',
		password: '',
		cf_password: '',
	};
	const [data, setData] = useState(initialState);
	const { avatar, name, password, cf_password } = data;

	useEffect(() => {
		if (auth.user) {
			setData({ ...data, name: auth.user.name });
		}
	}, [auth.user]);

	const handleChange = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value });
		dispatch({ type: 'NOTIFY', payload: {} });
	};

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    if(password){
      const errMsg = valid(name, auth.user.email, password, cf_password)
      if(errMsg) return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
      updatePassword()
    }

  }

  const updatePassword = () => {
    dispatch({type: 'NOTIFY', payload: {loading: true}})
    patchData('user/resetPassword', {password}, auth.token)
    .then(res => {
      if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.msg}})
      return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    })

  }

	if (!auth.user) return null;
	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<h1>Profile</h1>
				<h2>
					{auth.user.role === 'user'
						? 'User Profile'
						: 'Admin Profile'}
				</h2>
				<img src={auth.user.avatar} />
				<form>
					<label>Name: </label>
					<input
						type='text'
						placeholder='Your name'
						name='name'
						value={name}
            onChange={handleChange}
					/>
					<label>Email: </label>
					<input
						type='text'
						defaultValue={auth.user.email}
						disabled={true}
					/>
					<label>New Password: </label>
					<input
						type='password'
						placeholder='New password'
						name='password'
						value={password}
            onChange={handleChange}
					/>
					<label>Confirm Password: </label>
					<input
						type='password'
						placeholder='Confirm password'
            name='cf_password'
						value={cf_password}
            onChange={handleChange}
					/>
				</form>
				<button onClick={handleUpdateProfile}>Update</button>
			</div>
		</>
	);
};

export default Profile;
