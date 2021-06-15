//NPM
import Link from 'next/link';
import { useContext, useState } from 'react';
import { NotePencil, ShoppingCart, Trash } from 'phosphor-react';
import { motion } from 'framer-motion';
//CSS
import styles from '../../styles/Shop.module.css';
// Project files
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';
import { useEffect } from 'react';

const ProductItem = ({ product, handleCheck }) => {
	const cx = (...classNames) => classNames.join(' ');
	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;

	const [addedToCart, setAddedToCart] = useState(false);

	const { cart } = state;

	useEffect(() => {
		cart.map((item) => {
			if (item._id === product._id) {
				setAddedToCart(true);
			}
		});
	}, [cart]);

	const userButtons = () => {
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
             initial={false}
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


	const adminButtons = () => {
		return (
			<>
				<div className={styles.buttonDiv}>
					<Link href={`/admin/product/${product._id}`}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className='w-28 h-12 bg-gray-900 text-white rounded-lg'>
							<div className='flex items-center justify-center'>
								<NotePencil
									size={20}
									className='mr-2'
									weight='bold'
								/>
								Edit
							</div>
						</motion.button>
					</Link>
					<motion.button
						whileTap={{ scale: 0.9 }}
						className='h-12 w-28 bg-red-600 text-white rounded-lg'
						onClick={() => {
							dispatch({type: 'ADD_MODAL', payload: [{data: '', id: product._id, title: product.title, type: 'DELETE_PRODUCT'}]});
						}}>
						<div className='flex items-center justify-center'>
							<Trash size={20} className='mr-2' weight='bold' />
							Delete
						</div>
					</motion.button>
				</div>
			</>
		);
	};
  
	const { title, description, inStock, price, images } = product;
  
	return (
    <>
			<motion.div
				/*whileHover={{ scale: 1.02 }}*/ className='bg-white my-5 w-270 h-450 shadow-even rounded-2xl overflow-hidden sm:mr-5'>
        {auth.user && auth.user.role === 'admin' &&
          <input className="absolute ml-2 mt-2 w-6 h-6" type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)} />
        }
				<div className={styles.imageDiv}>
					<img className={styles.image} src={images[0].url} alt="Product images" />
				</div>
				<div className={styles.text}>
					<div className='w-full flex justify-between'>
						<p className='font-semibold'>NOK {price}.00</p>
						{inStock !== 0 ? (
							<p className='font-semibold text-green-500'>
								In stock: {inStock}
							</p>
						) : (
							<p className='font-semibold text-red-600'>
								Not in stock
							</p>
						)}
					</div>
					<div className='w-full flex flex-col justify-evenly'>
						<h1 className='capitalize font-bold mb-2' title={title}>
							{title}
						</h1>
						<p className={styles.description} title={description}>
							{description}
						</p>
					</div>
					{!auth.user || auth.user.role !== 'admin'
						? userButtons()
						: adminButtons()} 
				</div>
			</motion.div>
		</>
	);
};

export default ProductItem;
