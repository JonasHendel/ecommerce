//NPM
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowCircleLeft } from 'phosphor-react';

// Project Files
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import { getData, postData } from '../utils/fetchData';

function cart() {
	const router = useRouter();
	const stripePromise = loadStripe(
    process.env.STRIPE_PK
	);
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth } = state;

  const user = auth.user

	const [total, setTotal] = useState(0);

	useEffect(() => {
		const getTotal = () => {
			const res = cart.reduce((prev, item) => {
				return prev + item.price * item.quantity;
			}, 0);
			setTotal(res);
		};

		getTotal();
	}, [cart]);

	useEffect(() => {
		const cartLocal = JSON.parse(
			localStorage.getItem('__next__cart01__solimeo')
		);
		if (cartLocal && cartLocal.length > 0) {
			let newArr = [];
			const updateCart = async () => {
				for (const item of cartLocal) {
					const res = await getData(`product/${item._id}`);
					const {
						_id,
						title,
						images,
						price,
						inStock,
						sold,
					} = res.product;
					if (inStock > 0) {
						newArr.push({
							_id,
							title,
							images,
							price,
							inStock,
							sold,
							quantity:
								item.quantity > inStock ? 1 : item.quantity,
						});
					}
				}
				dispatch({ type: 'ADD_CART', payload: newArr });
			};
			updateCart();
		}
	}, []);

	if (cart.length === 0) {
		return (
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
      <Head>
        <title>
          Empty Cart
        </title>
      </Head>
				<div className='mt-20 flex flex-col justify-evenly items-center'>
					<ShoppingCart size={160} />
					<div className='flex flex-col items-center'>
						<h1 className='font-bold mt-4 text-4xl'>
							Your cart is empty
						</h1>
						<h2 className='text-gray-500 mt-4'>
							Please add something to your cart
						</h2>
					</div>
					<Link href='/shop'>
						<motion.a
							className='p-3 bg-gray-900 mt-4 text-white rounded-lg cursor-pointer flex items-center'
							whileTap={{ scale: 0.9 }}
						>
              <ArrowCircleLeft size={30} className="mr-2"/>
							Continue shopping
						</motion.a>
					</Link>
				</div>
			</div>
		);
	}

	const handlePayment = async () => {
		if (!auth.user) {
			return router.push('/signin');
		}
		const stripe = await stripePromise;
		const session = await postData('order/cart-session', {cart, user});

		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
      dispatch({type: 'NOTIFY', payload: {error: result.error.message}});
		}
	};


	return (
		<>
			<Head>
				<title>Handlekurv</title>
			</Head>
			<main className='flex items-center max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
				<div className='flex flex-col justify-start  w-full min-h-500 p-10 my-20 rounded-2xl shadow-even'>
          <div className="mb-16">
					<button className="flex items-center text-xl" onClick={() => router.back()}> <ArrowCircleLeft className="mr-2" weight='bold'/>Return</button>
          </div>
					<main className='flex flex-col md:flex-row justify-evenly items-center w-full'>
						<section className='flex flex-col'>
							{cart.map((item) => (
								<CartItem
									key={item._id}
									item={item}
									dispatch={dispatch}
									cart={cart}
								/>
							))}
						</section>
						<section className='ml-9 flex text-center w-96 md:text-left md:w-1/5 flex-col justify-center '>
							<h3 className='font-bold mb-10 text-4xl'>
								Total:
								<br /> NOK{' '}
								{total
									.toString()
									.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
							</h3>
							<button
								className='h-12 w-full bg-gray-900 text-white rounded-lg'
								onClick={handlePayment}
							>
								Fortsett med betaling
							</button>
						</section>
					</main>
				</div>
			</main>
		</>
	);
}

export default cart;
