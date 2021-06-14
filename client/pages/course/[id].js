import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useRouter} from 'next/router'
import { loadStripe } from '@stripe/stripe-js';
import { MinusCircle, PlusCircle, Calendar, Clock } from 'phosphor-react';
import { addCourse } from '../../store/Actions';
import ImageSlider from '../../components/slider/ImageSlider'

import {DataContext} from '../../store/GlobalState'
import {postData} from '../../utils/fetchData'

const Course = (props) => {
  const router = useRouter()

  const stripePromise = loadStripe(
    process.env.STRIPE_PK
	);

  const {state, dispatch} = useContext(DataContext)

  const {auth} = state

  const {user} = auth

	const initialState = {
		...props.course,
		quantity: 1,
	};

	const [tab, setTab] = useState(0);
	const [course, setCourse] = useState(initialState);
	const { quantity, price } = course;


	const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-4 border-black ';
		return 'h-12 mr-2';
	};

  console.log(course)


  const handlePayment = async () => {
		if (!auth.user) {
			return router.push('/signin');
		}

    dispatch({type: 'ADD_COURSE', payload: {}})
    
		const stripe = await stripePromise;
		const session = await postData('order/course-session', {course, user})
    
    dispatch(addCourse(course));

		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.log(result.error.message);
		}
	};

	return (
		<>
			<Head>
				<title>{course.title}</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex justify-evenly mt-10 items-center w-full h-5/6 shadow-even rounded-2xl'>
					<section className='flex flex-col full w-2/5 justify-center items-start'>
						<h1 className='uppercase font-bold text-2xl mb-10'>
							{course.title}
						</h1>
						<div className='mb-10'>
              <ImageSlider slides={course.images}/>
						</div>
						<div className='w-full'>
							<p className='font-bold'>{course.description}</p>
							<p>{course.content}</p>
						</div>
					</section>
					<section className='w-96 h-3/6 flex flex-col justify-evenly'>
            <div className="flex justify-between">
              <p className="font-semibold text-xl flex items-center"><Calendar/>{course.date}</p>
              <p className="font-semibold text-xl flex items-center"><Clock/>{course.time}</p>
            </div>
						<div className='flex justify-between'>
							<p className='font-semibold text-xl'>Pris per bilett: {course.price}</p>
							{course.spots > 0 ? (
								<p className='font-semibold text-green-500 text-xl'>
									Ledige plasser: {course.spots - quantity}
								</p>
							) : (
								<p className='font-semibold text-red-600'>
									Utsolgt
								</p>
							)}
						</div>
						<div className='flex justify-evenly items-center'>
							<button
								onClick={() => {
									if (course.quantity > 1) {
										setCourse({
											...course,
											quantity: quantity - 1,
										});
									}
								}}>
								<MinusCircle className="text-3xl text-red-600" weight='bold'/>
							</button>
							<p className="text-3xl font-bold">{course.quantity}</p>
							<button
								onClick={() =>{
                  if(course.quantity < course.spots)
									setCourse({
										...course,
										quantity: quantity + 1,
									})
                }
								}>
								<PlusCircle className="text-3xl text-green-600" weight='bold'/>
							</button>
						</div>
            <div className="flex justify-center">
            <h3 className='font-bold mb-10 text-4xl'>
								Total: NOK{' '}
								{price*quantity}
							</h3>
            </div>
						<div className='flex justify-between'>
            {course.spots > 0 ? (
							<motion.button
                onClick={handlePayment}
								animate={{ scale: [0.9, 1.1, 1.0] }}
								transition={{ duration: 0.2 }}
								className='h-12 w-60 bg-gray-900 text-white rounded-lg'
							>
								<div className='flex items-center justify-center'>
                  Proceed with payment
								</div>
							</motion.button>
								
							) : (
                <motion.button
								animate={{ scale: [0.9, 1.1, 1.0] }}
								transition={{ duration: 0.2 }}
								className='h-12 w-60 bg-red-600 text-white rounded-lg'
							>
								<div className='flex items-center justify-center'>
                 Utsolgt 
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
	const res = await getData(`course/${id}`);

	return {
		props: { course: res.course },
	};
}

export default Course;
