//NPM
import Link from 'next/link';
import { useContext } from 'react';
import {ShoppingCart} from 'phosphor-react'
import {motion} from 'framer-motion'
//CSS
import styles from '../../styles/Shop.module.css';
// Project files
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';
import { useEffect } from 'react';

const ProductItem = ({ product }) => {
	const cx = (...classNames) => classNames.join(' ');
	const { state, dispatch } = useContext(DataContext);

	const { cart } = state;


	const buttons = () => {
		return (
			<>
				<div className={styles.buttonDiv}>
					<Link href={`shop/product/${product._id}`}>
						<motion.button whileTap={{ scale: 0.9 }} className="w-20 h-12 bg-gray-900 text-white rounded-lg">
							View
						</motion.button>
					</Link>
					<motion.button whileTap={{ scale: 0.9 }}
						className='h-12 w-36 bg-gray-900 text-white rounded-lg'
						onClick={() => {
              dispatch(addToCart(product, cart))
              }}
					>
            <div className="flex items-center justify-center">
              <ShoppingCart size={20} className="mr-2"/>
						  Add to cart
            </div>
					</motion.button>
				</div>
			</>
		);
	};

	const { title, description, inStock, price, images } = product;

	return (
		<>
			<motion.div /*whileHover={{ scale: 1.02 }}*/ className={styles.productCard}>
				<div className={styles.imageDiv}>
					<img className={styles.image} src={images[0].url} />
				</div>
				<div className={styles.text}>
					<div className='w-full flex justify-between'>
						<p className="font-semibold">NOK {price}.00</p>
						{inStock !== 0 ? (
							<p className="font-semibold text-green-500">
								In stock: {inStock}
							</p>
						) : (
							<p className="font-semibold text-red-600">Not in stock</p>
						)}
					</div>
          <div>
            <h1 className="capitalize font-bold mb-2" title={title}>{title}</h1>
            <p className={styles.description} title={description}>
              {description}
            </p>
          </div>
					{buttons()}
				</div>
			</motion.div>
		</>
	);
};

export default ProductItem;
