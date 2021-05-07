//NPM
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router'
//CSS
import styles from '../styles/Cart.module.css';

// Project Files
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import { getData, postData } from '../utils/fetchData';

function cart() {
  const router = useRouter() 
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

    if(!auth.user){
      return router.push('/signin')
    }

		const stripe = await stripePromise;
		const session = await postData('order/create-checkout-session', cart);

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
			<div className='flex items-center max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
				<div className='flex w-full py-20 rounded-md justify-evenly bg-gray-100 '>
					<div className='w-1/3'>
						<h1 className="font-bold ">Handlekurv</h1>
								{cart.map((item) => (
									<CartItem
										key={item._id}
										item={item}
										dispatch={dispatch}
										cart={cart}
									/>
								))}
					</div>
					<div className='ml-9 flex flex-col justify-evenly '>
						<h3 className="font-bold text-4xl">Total: NOK {total}</h3>
							<button
								className='submit-btn'
								onClick={handleClick}
							>
								Proceed with payment
							</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default cart;
