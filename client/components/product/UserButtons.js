import { ShoppingCart } from 'phosphor-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { addToCart } from '../../store/Actions';
//CSS
import styles from '../../styles/Shop.module.css';

const UserButtons = (props) => {

  const {product, cart, addedToCart, dispatch} = props

	return (
		<>
			<div className={styles.buttonDiv}>
				<Link href={`shop/product/${product._id}`}>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='w-20 h-12 bg-gray-900 text-white rounded-lg'>
						View
					</motion.button>
				</Link>
				{addedToCart ? (
					<motion.button
						animate={{ scale: [0.9, 1.1, 1.0] }}
						transition={{ duration: 0.2 }}
						className='h-12 w-36 bg-green-500 text-white rounded-lg'
						onClick={() => {
							dispatch(addToCart(product, cart));
						}}>
						<div className='flex items-center justify-center'>
							<ShoppingCart size={20} className='mr-2' />
							In cart
						</div>
					</motion.button>
				) : (
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='h-12 w-36 bg-gray-900 text-white rounded-lg'
						onClick={() => {
							dispatch(addToCart(product, cart));
						}}>
						<div className='flex items-center justify-center'>
							<ShoppingCart size={20} className='mr-2' />
							Add to cart
						</div>
					</motion.button>
				)}
			</div>
		</>
	);
};

export default UserButtons
