import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ShoppingCart } from 'phosphor-react';

const variants = {
	enter: (direction) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const Course = (props) => {
	const [[tab, direction], setTab] = useState([0, 0]);
	const [course] = useState(props.course);

	// setTimeout(() => {
	// 	if (tab >= course.images.length - 1) {
	// 		setTab(0);
	// 	} else {
	// 		setTab(tab + 1);
	// 	}
	// }, 5000);

	const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-4 border-white ';
		return 'h-12 mr-2';
	};
	return (
		<>
			<Head>
				<title>{course.title}</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex justify-evenly mt-20 items-center w-5/6 h-4/5 shadow-even rounded-2xl'>
					<section className='flex flex-col h-4/5 w-1/2 justify-center'>
						<h1 className='capitalize font-bold text-2xl mb-10'>
							{course.title}
						</h1>
						<div className='mb-10'>
							<AnimatePresence>
								<motion.img
									className='w-96 h-72 object-cover mb-2'
									src={course.images[tab].url}
									variants={variants}
									initial={{
										x: direction > 0 ? 1000 : -1000,
										opacity: 0,
									}}
									animate='center'
									exit='exit'
									transition={{
										x: {
											type: 'spring',
											stiffness: 300,
											damping: 30,
										},
										opacity: { duration: 0.2 },
									}}
								/>
							</AnimatePresence>
							<div className='flex'>
								{course.images.map((img, index) => (
									<img
										className={isActive(index)}
										key={index}
										src={img.url}
										alt={img.url}
										onClick={() => {
											setTab(index);
										}}
									/>
								))}
							</div>
						</div>
						<div className='w-5/6'>
							<p className='font-bold'>{course.description}</p>
							<p>{course.content}</p>
						</div>
					</section>
					<div className='w-96 h-5/6 flex flex-col justify-evenly'>
						<div className='flex justify-between'>
							<p className='font-semibold'>NOK: {course.price}</p>
							{course.inStock !== 0 ? (
								<p className='font-semibold text-green-500'>
									Ledige plasser: {course.spots}
								</p>
							) : (
								<p className='font-semibold text-red-600'>
									Utsolgt
								</p>
							)}
						</div>
						<div className='flex justify-between'>
							<motion.button
								animate={{ scale: [0.9, 1.1, 1.0] }}
								transition={{ duration: 0.2 }}
								className='h-12 w-60 bg-green-500 text-white rounded-lg'
								onClick={() => {
									dispatch(addToCart(course, cart));
								}}>
								<div className='flex items-center justify-center'>
									<ShoppingCart size={20} className='mr-2' />
									In cart
								</div>
							</motion.button>
							<button
								className='cancel-btn'
								onClick={() => {
									router.back();
								}}>
								Return
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`course/${id}`);

	return {
		props: { course: res.course },
	};
}

export default Course;
