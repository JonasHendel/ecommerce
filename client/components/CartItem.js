import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
					<Link href={`shop/product/${item._id}`}>
          <div className="cursor-pointer">      
						<a className='capitalize font-bold'>{item.title}</a>

						<h6 className='font-semibold'>
							NOK {item.quantity * item.price}
						</h6>
						{item.inStock > 0 ? (
							<p className='font-semibold text-green-500'>
								In Stock: {item.inStock}
							</p>
						) : (
							<p className='font-semibold text-red-600'>
								Not in stock
							</p>
						)}
          </div>
					</Link>
				</div>
				<div className='flex items-center'>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='text-3xl'
						onClick={() => dispatch(decrease(cart, item._id))}
						disabled={item.quantity === 1 ? true : false}
					>
						<MinusCircle
							className='text-red-600'
							size={30}
							weight='bold'
						/>
					</motion.button>
					<p className='w-6 text-center'>{item.quantity}</p>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='text-3xl'
						onClick={() => dispatch(increase(cart, item._id))}
						disabled={item.quantity === item.inStock ? true : false}
					>
						<PlusCircle
							className='text-green-500'
							size={30}
							weight='bold'
						/>
					</motion.button>
				</div>
				<motion.div
					className='cursor-pointer ml-7'
					whileTap={{ scale: 0.9 }}
					onClick={() => dispatch({type: 'ADD_MODAL', payload: [{data: cart, id:item._id, title: item.title, type: 'ADD_CART'}]})}
				>
					<Trash size={30} weight='bold' />
				</motion.div>
			</div>
		</>
	);
};

export default CartItem;
