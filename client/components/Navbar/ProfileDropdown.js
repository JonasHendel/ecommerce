import { Fragment } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { Menu, Transition } from '@headlessui/react';
import { User  } from 'phosphor-react'

import {useContext} from 'react'

import { DataContext } from '../../store/GlobalState';

const ProfileDropdown = ({ classNames }) => {

  const {dispatch} = useContext(DataContext)

	const handleLogout = () => {
		Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
		localStorage.removeItem('firstLogin');
		dispatch({ type: 'AUTH', payload: {} });
		dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } });
	};
	return (
		<Menu as='div' className='ml-3 relative'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button className='bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
							<span className='sr-only'>Open user menu</span>
							<User className='h-8 w-8' aria-hidden='true' />
						</Menu.Button>
					</div>
					<Transition
						show={open}
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							static
							className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
						>
							<Menu.Item>
								{({ active }) => (
                  <Link href='profile'>
                    <a
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </a>
                  </Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href='#'
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700'
										)}
									>
										Settings
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										onClick={handleLogout}
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700'
										)}
									>
										Sign out
									</a>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default ProfileDropdown;
