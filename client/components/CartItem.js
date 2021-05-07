import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Link from 'next/link';
import {motion } from 'framer-motion'
import { Trash, MinusCircle, PlusCircle } from 'phosphor-react';
import { decrease, increase, deleteItem } from '../store/Actions';

const CartItem = ({ item, dispatch, cart }) => {
	// const {state, dispatch} = useContext(DataContext)

	return (
		<>
			<div className='flex mb-5 justify-between items-center'>
				<div>
					<img
						className='w-28 rounded-md'
						src={item.images[0].url}
					></img>
				</div>
				<div className='w-2/5'>
					<h5>
						<Link href={`shop/product/${item._id}`}>
							<a className='capitalize font-bold'>{item.title}</a>
						</Link>
					</h5>

					<h6>NOK {item.quantity * item.price}</h6>
					{item.inStock > 0 ? (
						<p>In Stock: {item.inStock}</p>
					) : (
						<p>Not in stock</p>
					)}
				</div>
				<div className='flex items-center'>
					<button
						className='text-3xl'
						onClick={() => dispatch(decrease(cart, item._id))}
						disabled={item.quantity === 1 ? true : false}
					>
						<MinusCircle />
					</button>
					<p className='w-6 text-center'>{item.quantity}</p>
					<button
						className='text-3xl'
						onClick={() => dispatch(increase(cart, item._id))}
						disabled={item.quantity === item.inStock ? true : false}
					>
						<PlusCircle />
					</button>
				</div>
				<motion.div whileTap={{scale: 0.9}} onClick={() => dispatch(deleteItem(cart, item._id))}>
					<Trash
						size={30}
						color='red'
						
					/>
				</motion.div>
			</div>
		</>
	);
};

export default CartItem;
