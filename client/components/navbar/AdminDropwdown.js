import { Fragment } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { Menu, Transition } from '@headlessui/react';
import { Gear } from 'phosphor-react';

import { useContext } from 'react';

import { DataContext } from '../../store/GlobalState';

const AdminDropdown = ({ classNames }) => {
	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;

	return (
		<Menu as='div' className='ml-3 relative'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button className='bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
							<span className='sr-only'>Open user menu</span>
							<Gear className='h-8 w-8' aria-hidden='true' />
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
						leaveTo='transform opacity-0 scale-95'>
						<Menu.Items
							static
							className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<Menu.Item>
								{({ active }) => (
									<Link href='/admin/users'>
										<a
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}>
											Users
										</a>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link href='/admin/product'>
										<a
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}>
											Create Product
										</a>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link href='/admin/course'>
										<a
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}>
											Create Course
										</a>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link href='/admin/event'>
										<a
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}>
											Create Event
										</a>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link href='/admin/categories'>
										<a
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}>
											Categories
										</a>
									</Link>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default AdminDropdown;
