import Head from 'next/head';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import { CheckCircle, NotePencil, Trash, XCircle, XSquare } from 'phosphor-react'
import Link from 'next/link'

const Users = () => {
	const { state, dispatch } = useContext(DataContext);
	const { users, auth } = state;

	return (
		<div>
			<Head>
				<title>Users</title>
			</Head>
			<table>
				<thead className=''>
					<tr className=''>
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
						<tr key={user._id} className=''>
							<th className=''>{index + 1}</th>
							<th className=''>{user._id}</th>
							<th className=''>{user.name}</th>
							<th className=''>{user.email}</th>
							<th className=''>
                {
                  user.role === 'admin' 
                  ? user.root ? <div className="flex items-center"><CheckCircle className="text-green-500"/> <a> Root</a> </div>
                              : <a>User</a>
                  : <XCircle className="text-red-600"/>
                }
              </th>
							<th className='flex justify-center'>
                <Link href={auth.user.root && auth.user.email || user.email
                  ? `/edit_user/${user._id}` : '#!'}>
                  <div className="cursor-pointer">
                    <NotePencil/>
                  </div>
                  </Link>
                  {
                    auth.user.root && auth.user.email || user.email
                    ? <Trash onClick={()=>dispatch({ type: 'ADD_MODAL', payload: [{data: user, id: user._id, title: user.name, type: 'ADD_USERS'}]})
                    } />
                    : <XSquare/> 
                  }
              </th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
