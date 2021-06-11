import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle } from 'phosphor-react';

import { DataContext } from '../../../store/GlobalState';
import { useRouter } from 'next/router';
import { patchData } from '../../../utils/fetchData';
import { updateItem } from '../../../store/Actions';

const OrderDetails = () => {
	const { state, dispatch } = useContext(DataContext);
	const { orders, auth } = state;
	const router = useRouter();
	const [orderDetail, setOrderDetail] = useState([]);

	useEffect(() => {
		const newArr = orders.filter((order) => order._id === router.query.id);
		setOrderDetail(newArr);
	}, [orders]);

	const handleDelivered = (order) => {
		dispatch({ type: 'NOTIFY', payload: { loading: true } });
		patchData(`order/delivered/${order._id}`, null, auth.token).then(
			(res) => {
				if (res.err) {
					return dispatch({
						type: 'NOTIFY',
						payload: { error: res.err },
					});
				}
				dispatch(
					updateItem(
						orders,
						order._id,
						{
							...order,
							...res.result,
						},
						'ADD_ORDERS'
					)
				);
				return dispatch({
					type: 'NOTIFY',
					payload: { success: res.msg },
				});
			}
		);
	};

  if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}
	return (
		<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
			<Head>
				<title>Order Details</title>
			</Head>
			<div>
				{orderDetail.map((order) => (
					<div
						className='flex flex-col justify-start  w-full min-h-500 my-20 rounded-2xl shadow-even'
						key={order._id}>
						<div className='flex justify-start'>
							<button
								onClick={() => router.back()}
								className='flex items-center justify-center h-12 w-28 mb-4 font-bold'
								aria-hidden='true'>
								<ArrowLeft className='mr-2' />
								Return
							</button>
						</div>
						<div className='flex justify-center mb-6'>
							<h1 className='text-3xl font-bold'>
								Order: {order._id}
							</h1>
						</div>
						<div className='flex justify-center'>
							<div className='w-2/5 flex flex-col'>
								<h2 className='text-lg font-semibold'>
									Shipping:{' '}
								</h2>
								{order.user ? (
									<div className='mt-4'>
										<div className='flex'>
											<p className='font-semibold mr-1'>
												Name:
											</p>{' '}
											{order.user.name}
										</div>
										<div className='flex'>
											<p className='font-semibold mr-1'>
												Email:
											</p>{' '}
											{order.user.email}
										</div>
										<div className='flex'>
											<p className='font-semibold mr-1'>
												Address:
											</p>{' '}
											{order.address.line1},{' '}
											{order.address.city},{' '}
											{order.address.country}
										</div>
									</div>
								) : (
									<p>Not found</p>
								)}
								<div className='mt-8'>
									{order.delivered ? (
										<p className='text-green-600 font-semibold'>
											Delivered on {order.updatedAt}
										</p>
									) : (
										<p className='text-red-600 font-semibold'>
											Not delivered
										</p>
									)}
									{auth.user.role === 'admin' &&
										!order.delivered && (
											<button
												className='h-12 mt-4 px-4 bg-gray-900 text-white rounded-lg'
												onClick={() =>
													handleDelivered(order)
												}>
												Mark as delivered
											</button>
										)}
								</div>
							</div>
							<div className='w-2/5'>
								<h1 className='text-lg font-bold'>Items</h1>
								{order.cart.map((item) => (
									<div key={item._id} className='flex mb-4'>
										<div>
											<img
												className='w-28 rounded-md'
												src={item.images[0].url}></img>
										</div>
										<div className='flex justify-center'>
											<Link
												href={`/shop/product/${item._id}`}>
												<div className='ml-4 cursor-pointer flex flex-col h-full justify-evenly'>
													<a className='capitalize font-bold'>
														{item.quantity}
														<a className='lowercase'>
															x
														</a>{' '}
														{item.title}
													</a>
													<a className='font-semibold'>
														NOK{' '}
														{item.quantity *
															item.price}
													</a>
												</div>
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderDetails;
