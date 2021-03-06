// NPM
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'phosphor-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
// CSS
import styles from '../../..//styles/Product.module.css';

// Project files
import { getData } from '../../../utils/fetchData';
import { DataContext } from '../../../store/GlobalState';
import { addToCart } from '../../../store/Actions';
import ImageSlider from '../../../components/slider/ImageSlider';

const DetailProduct = (props) => {
	const router = useRouter();
	const cx = (...classNames) => classNames.join(' ');

	const [product] = useState(props.product);
	const [tab, setTab] = useState(0);
	const [addedToCart, setAddedToCart] = useState(false);

	const { state, dispatch } = useContext(DataContext);
	const { cart } = state;

	const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-2 border-white ';
		return 'h-12 mr-2';
	};
	useEffect(() => {
		cart.map((item) => {
			if (item._id === product._id) {
				setAddedToCart(true);
			}
		});
	}, [cart]);

	return (
		<>
			<Head>
				<title>{product.title}</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex flex-col justify-start md:justify-evenly mt-20 items-center w-full h-850 md:h-1/2  md:shadow-even md:flex-row rounded-2xl'>
					<div className='flex flex-col ca:h-5/6 justify-center'>
						<ImageSlider slides={product.images} />
					</div>
					<section className='w-96 md:w-2/5 mt-10 md:h-5/6 flex flex-col justify-evenly'>
						<h1 className='capitalize font-bold text-2xl'>
							{product.title}
						</h1>
						<div className='flex mt-2 md:m-0 justify-between'>
							<p className='font-semibold'>
								NOK: {product.price}
							</p>
							{product.inStock !== 0 ? (
								<p className='font-semibold text-green-500'>
									In stock: {product.inStock}
								</p>
							) : (
								<p className='font-semibold text-red-600'>
									Not in stock
								</p>
							)}
						</div>
						<p className='mt-2 md:m-0'>{product.description}</p>
						<p className='h-42'>{product.content}</p>
						<div className='flex mt-4 md:m-0 justify-between'>
							{addedToCart ? (
								<motion.button
									animate={{ scale: [0.9, 1.1, 1.0] }}
									transition={{ duration: 0.2 }}
									className='h-12 w-60 bg-green-500 text-white rounded-lg'
									onClick={() => {
										dispatch(addToCart(product, cart));
									}}>
									<div className='flex items-center justify-center'>
										<ShoppingCart
											size={20}
											className='mr-2'
										/>
										In cart
									</div>
								</motion.button>
							) : (
								<motion.button
									whileTap={{ scale: 0.9 }}
									className='h-12 w-60 bg-gray-900 text-white rounded-lg'
									onClick={() => {
										dispatch(addToCart(product, cart));
									}}>
									<div className='flex items-center justify-center'>
										<ShoppingCart
											size={20}
											className='mr-2'
										/>
										Add to cart
									</div>
								</motion.button>
							)}
							<button
								className='cancel-btn'
								onClick={() => {
									router.back();
								}}>
								Return
							</button>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`product/${id}`);
	return {
		props: { product: res.product },
	};
}
export default DetailProduct;
