import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import {
	CheckCircle,
	NotePencil,
	Trash,
	XCircle,
	XSquare,
} from 'phosphor-react';
import Link from 'next/link';

const Users = () => {
	const { state, dispatch } = useContext(DataContext);
	const { users, auth } = state;

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
				<title>Users</title>
			</Head>
			<div className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="mt-10 text-2xl font-bold">Users</h1>
				<table className="w-full table-auto mt-10">
					<thead className=''>
						<tr className='text-left'>
							<th className=''></th>
							<th className=''>ID</th>
							<th className=''>Name</th>
							<th className=''>Email</th>
							<th className=''>Admin</th>
							<th className=''>Actions</th>
						</tr>
					</thead>
					<tbody className=''>
						{users.map((user, index) => (
							<tr key={user._id} className='text-left divide-y divide-gray-200'>
								<td className=''>{index + 1}</td>
								<td className=''>{user._id}</td>
								<td className=''>{user.name}</td>
								<td className=''>{user.email}</td>
								<td className=''>
									{user.role === 'admin' ? (
										user.root ? (
											<div className='flex items-center'>
												<CheckCircle className='text-green-500 text-xl mr-2' weight="bold"/>{' '}
												<a className="text-green-500"> Root</a>{' '}
											</div>
										) : (
											<CheckCircle className='text-green-500 text-xl' weight="bold" />
										)
									) : (
										<XCircle className='text-red-600 text-xl' weight="bold" />
									)}
								</td>
								<td className='flex justify-evenly'>
									<Link
										href={
											(auth.user.root &&
												auth.user.email) ||
											user.email
												? `/admin/user/${user._id}`
												: '#!'
										}>
										<div className='cursor-pointer'>
											<NotePencil className="text-xl"/>
										</div>
									</Link>
									{auth.user.root &&
									auth.user.email !== user.email ? (
										<Trash
                    className="text-xl text-red-600 cursor-pointer"
                    weight="bold"
											onClick={() =>
												dispatch({
													type: 'ADD_MODAL',
													payload: [
														{
															data: users,
															id: user._id,
															title: user.name,
															type: 'ADD_USERS',
														},
													],
												})
											}
										/>
									) : (
										<XSquare className="text-xl"/>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
