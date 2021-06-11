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

const Event = ({ event }) => {
	const cx = (...classNames) => classNames.join(' ');
	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;

	const userButtons = () => {
		return (
			<>
				<div className='flex justify-center'>
					<Link href={`/course/${event._id}`}>
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
					<Link href={`/admin/event/${event._id}`}>
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
							dispatch({type: 'ADD_MODAL', payload: [{data: '', id: event._id, title: event.title, type: 'DELETE_COURSE'}]});
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
  
	const { title, description, content, images } = event;
  
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
					<div className='w-full flex flex-col justify-evenly'>
						<h1 className='capitalize font-bold mb-2' title={title}>
							{title}
						</h1>
						<p title={description}>
							{description}
						</p>
            <p>
              {content}
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

export default Event;
