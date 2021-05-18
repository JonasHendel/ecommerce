import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle } from 'phosphor-react';

const OrderDetails = () => {
	const { state, dispatch } = useContext(DataContext);
	const { orders, auth } = state;
	const router = useRouter();
	const [orderDetail, setOrderDetail] = useState([]);

	useEffect(() => {
		const newArr = orders.filter((order) => order._id === router.query.id);
		setOrderDetail(newArr);
	}, [orders]);
	return (
		<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
			<Head>
				<title>Order Details</title>
			</Head>
			<button onClick={() => router.back()} className='flex items-center' aria-hidden="true">
				<ArrowLeft /> Return
			</button>
			<div>
				{orderDetail.map((order) => (
					<div key={order._id}>
						<h2>Order: {order._id}</h2>
						<div>
							<h1>Shipping</h1>
							<p>Name: {order.user.name}</p>
							<p>Email: {order.user.email}</p>
							<p>
								Address: {order.address.line1},{' '}
								{order.address.city}, {order.address.country}
							</p>
							<div>
								{order.delivered ? (
									<p>Delivered on {order.updatedAt}</p>
								) : (
									<p>Not delivered</p>
								)}
							</div>
						</div>
						<div>
							<h1>Items</h1>
							{order.cart.map((item) => (
								<div key={item._id} className='flex'>
									<div>
										<img
											className='w-28 rounded-md'
											src={item.images[0].url}
										></img>
									</div>
									<div className='flex justify-center'>
										<Link
											href={`/shop/product/${item._id}`}
										>
											<div className='cursor-pointer flex flex-col h-full justify-evenly'>
												<a className='capitalize text-lg font-bold'>
													{item.quantity}
													<a className='lowercase'>
														x
													</a>{' '}
													{item.title}
												</a>
												<a className='font-semibold'>
													NOK{' '}
													{item.quantity * item.price}
												</a>
											</div>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderDetails;
