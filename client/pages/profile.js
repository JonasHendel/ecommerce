import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link'
import {XCircle, CheckCircle} from 'phosphor-react'
import { useRouter } from 'next/router';


import { DataContext } from '../store/GlobalState';
import valid from '../utils/valid';
import { patchData } from '../utils/fetchData';




const Profile = () => {
  const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const { auth, notify, orders, tickets } = state


  
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
    const { name, value } = e.target;
		setData({ ...data, [name]: value });
		dispatch({ type: 'NOTIFY', payload: {} });
	};  
	const handleUpdateProfile = (e) => {
    e.preventDefault();
		if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
			if (errMsg)
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
			updatePassword();
      setData({...initialState, name})
		}
		if (name !== auth.user.name) updateName();
	};
  
	const updatePassword = () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
		patchData('user/updatePassword', { password }, auth.token).then(
      (res) => {
        if (res.err)
        return dispatch({
          type: 'NOTIFY',
          payload: { error: res.msg },
        });
				return dispatch({
          type: 'NOTIFY',
					payload: { success: res.msg },
				});
			}
      );
    };
    
    const updateName = () => {
      patchData('user', { name }, auth.token).then((res) => {
        if (res.err)
				return dispatch({
          type: 'NOTIFY',
					payload: { error: res.msg },
				});
        dispatch({
          type: 'NOTIFY',
          payload: { toke: auth.token, user: res.user },
        });
        return dispatch({
          type: 'NOTIFY',
          payload: { success: res.msg },
        });
      });
    };
  
  if (!auth.user) return null
	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
      <div className="flex justify-between mt-20 h-full">
				<div className='w-2/6 h-2/4 flex flex-col'>
					<h1 className='text-3xl font-bold'>
						{auth.user.role === 'user'
							? 'User Profile'
							: 'Admin Profile'}
					</h1>
					<form className='flex flex-col justify-evenly h-full'>
						<div className='flex items-center w-full justify-between'>
							<label className='font-bold mr-2'>Name: </label>
							<input
            className="border-4 border-black border-md rounded-md p-2"
								type='text'
								placeholder='Your name'
								name='name'
								value={name}
								onChange={handleChange}
							/>
						</div>
						<div className='flex items-center w-full justify-between'>
							<label className='font-bold mr-2'>Email: </label>
							<input
            className="rounded-md p-3 bg-gray-200"
								type='text'
								defaultValue={auth.user.email}
								disabled={true}
							/>
						</div>
						<div className='flex items-center w-full justify-between'>
							<label className='font-bold mr-2'>
								New Password:{' '}
							</label>
							<input
                className="border-4 border-black border-md rounded-md p-2"
								type='password'
								placeholder='New password'
								name='password'
								value={password}
								onChange={handleChange}
							/>
						</div>
						<div className='flex items-center w-full justify-between'>
							<label className='font-bold mr-2'>
								Confirm Password:{' '}
							</label>
							<input
            className="border-4 border-black border-md rounded-md p-2"
								type='password'
								placeholder='Confirm password'
								name='cf_password'
								value={cf_password}
								onChange={handleChange}
							/>
						</div>
					</form>
				<button className='h-14 mb-4 bg-gray-900 text-white rounded-lg' type='submit'
          onClick={handleUpdateProfile}>Update</button>
				</div>
				<div className="w-3/5">
					<h1 className='text-3xl font-bold'>Orders</h1>
            <table className="w-full table-auto divide-y">
            <thead>
              <tr className="font-bold uppercase ">
                <th className="text-left">Id</th>
                <th className="text-left">Date</th>
                <th className="text-left">Total</th>
                <th className="">Delivered</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order)=>(
                <tr key={order._id} >
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>NOK: {order.total/100}</td>
                  <td className="flex justify-center items-center">{order.delivered ? <CheckCircle className=" text-xl text-green-500"/> : <XCircle className="text-xl text-red-600"/>}</td>
                  <td><Link href={`/admin/order/${order._id}`}>
                    <a className="underline">Details</a>
                  </Link></td>
                </tr>
              ))}
            </tbody>
            </table>
				</div>
      </div>
			</div>
		</>
	);
};

export default Profile;
