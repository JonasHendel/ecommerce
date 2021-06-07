//NPM
import Link from 'next/link';
import { useContext, useState } from 'react';
import { NotePencil, Ticket, Trash } from 'phosphor-react';
import { motion } from 'framer-motion';
//CSS
import styles from '../styles/Course.module.css';
// Project files
import { DataContext } from '../store/GlobalState';
import { useEffect } from 'react';

const CourseItem = ({ course, handleCheck }) => {
	const cx = (...classNames) => classNames.join(' ');
	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;

	const userButtons = () => {
		return (
			<>
				<div className='flex justify-center'>
					<Link href={`/course/${course._id}`}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className=' w-64 h-12 bg-gray-900 text-white rounded-lg'>
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
				<div className='flex w-full justify-evenly'>
					<Link href={`/admin/tickets/${course._id}`}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className='w-36 h-12 bg-gray-900 text-white rounded-lg'>
							<div className='flex items-center justify-center'>
								<Ticket
									size={20}
									className='mr-2'
									weight='bold'
								/>
								Tickets
							</div>
						</motion.button>
					</Link>
					<Link href={`/admin/course/${course._id}`}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							className='w-36 h-12 bg-gray-900 text-white rounded-lg'>
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
						className='h-12 w-36 bg-red-600 text-white rounded-lg'
						onClick={() => {
							dispatch({type: 'ADD_MODAL', payload: [{data: '', id: course._id, title: course.title, type: 'DELETE_COURSE'}]});
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
  
	const { title, description, spots, price, images } = course;
  
	return (
    <>
			<motion.div
				 className={styles.productCard}>
        {/* {auth.user && auth.user.role === 'admin' &&
          <input className="absolute ml-2 mt-2 w-6 h-6" type="checkbox" checked={product.checked} onChange={()=>handleCheck(course._id)} />
        } */}
				<div className={styles.imageDiv}>
					<img className={styles.image} src={images[0].url} />
				</div>
				<div className={styles.text}>
					<div className='w-full flex justify-between'>
						<p className='font-semibold'>NOK {price}.00</p>
						{spots !== 0 ? (
							<p className='font-semibold text-green-500'>
								Available spots: {spots}
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
						<p title={description}>
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

export default CourseItem;
