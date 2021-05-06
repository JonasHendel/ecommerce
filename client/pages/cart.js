//NPM
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

//CSS
import styles from '../styles/Cart.module.css';

// Project Files
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import { getData, postData } from '../utils/fetchData';

function cart() {
	const stripePromise = loadStripe(
		'pk_test_51ImgVcGKeCgkx3sKS2Ft8rRE6dADswUuJc1otOGJjV89RYy0Jh1CiMvRlBZO47DtE0XkzJ6amvuUfeOEXhdoZyAo007ROFV2WI'
	);
	const { state, dispatch } = useContext(DataContext);
	const { cart, auth } = state;
  
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
					const { _id, title, images, price, inStock } = res.product;
					if (inStock > 0) {
						newArr.push({
							_id,
							title,
							images,
							price,
							inStock,
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
		return <h1>Cart is empty</h1>;
	}


  

	const handleClick = async (event) => {
		const stripe = await stripePromise;
		const session = await postData('checkout/create-session', cart);

		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.log(result.error.message);
		}
	};

	return (
		<>
			<Head>
				<title>Cart</title>
			</Head>
			<div className='h-screen flex justify-center items-center'>
				<div className='max-w-7xl flex'>
					<div className={styles.cart}>
						<h1>Handlekurv</h1>
						<table>
							<tbody>
								{cart.map((item) => (
									<CartItem
										key={item._id}
										item={item}
										dispatch={dispatch}
										cart={cart}
									/>
								))}
							</tbody>
						</table>
					</div>
					<div className='ml-9 flex flex-col justify-evenly bg-gray-400'>
						<form className=''>
							<h2>Shipping</h2>
							<input
								className=''
								type='next'
								name='address'
								id='address'
								placeholder='Address'
							/>
							<input
								className=''
								type='next'
								name='mobile'
								id='mobile'
								placeholder='Mobile'
							/>
						</form>
						<h3>Total: NOK {total}</h3>
						<Link href={auth.user ? '#' : '/signin'}>
							<button
								className='submit-btn'
								onClick={handleClick}
							>
								Proceed with payment
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default cart;
