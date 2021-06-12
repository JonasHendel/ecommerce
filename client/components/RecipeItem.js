//NPM
import Link from 'next/link';
import { useContext, useState } from 'react';
import { NotePencil, ShoppingCart, Trash } from 'phosphor-react';
import { motion } from 'framer-motion';
//CSS
import styles from '../styles/Shop.module.css';
// Project files
import { DataContext } from '../store/GlobalState';
import { useEffect } from 'react';

const RecipeItem = ({ recipe, handleCheck }) => {
	const cx = (...classNames) => classNames.join(' ');
	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;


	const { cart } = state;

	useEffect(() => {
		cart.map((item) => {
			if (item._id === recipe._id) {
				setAddedToCart(true);
			}
		});
	}, [cart]);

	const userButtons = () => {
		return (
			<>
				<div className={styles.buttonDiv}>
					<Link href={`shop/recipe/${recipe._id}`}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className='w-20 h-12 bg-gray-900 text-white rounded-lg'>
							View
						</motion.button>
					</Link>
				</div>
			</>
		);
	};


	const adminButtons = () => {
		return (
			<>
				<div className={styles.buttonDiv}>
					<Link href={`/admin/recipe/${recipe._id}`}>
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
							dispatch({type: 'ADD_MODAL', payload: [{data: '', id: recipe._id, title: recipe.title, type: 'DELETE_RECIPE'}]});
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
  
	const { title, description, inStock, price, images } = recipe;
  
	return (
    <>
			<motion.div
				/*whileHover={{ scale: 1.02 }}*/ className='bg-white my-5 w-270 h-450 shadow-even rounded-2xl overflow-hidden sm:mr-5'>
        {auth.user && auth.user.role === 'admin' &&
          <input className="absolute ml-2 mt-2 w-6 h-6" type="checkbox" checked={recipe.checked} onChange={()=>handleCheck(recipe._id)} />
        }
				<div className={styles.imageDiv}>
					<img className={styles.image} src={images[0].url} />
				</div>
				<div className={styles.text}>
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

export default RecipeItem;
