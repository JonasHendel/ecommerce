import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useRouter} from 'next/router'
import { loadStripe } from '@stripe/stripe-js';
import { MinusCircle, PlusCircle, Calendar, Clock, ArrowLeft } from 'phosphor-react';
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

	const [course, setCourse] = useState(initialState);
	const { quantity, price } = course;


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
      dispatch({type: 'NOTIFY', payload: {error: result.error.message}});
		}
	};

	return (
		<>
			<Head>
				<title>{course.title}</title>
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex flex-col justify-start md:justify-evenly md:mt-20 items-center w-full md:h-5/6  md:shadow-even md:flex-row rounded-2xl'>
					<section className='w-96 md:w-2/5 mt-10 md:h-5/6 flex flex-col justify-evenly'>
						<h1 className='uppercase font-bold text-2xl mb-10'>
							{course.title}
						</h1>
						<div className='mb-10'>
              <ImageSlider slides={course.images}/>
						</div>
						<div className='w-full md:mb-10'>
							<p className='font-bold'>{course.description}</p>
							<p>{course.content}</p>
						</div>
					</section>
					<section className='w-96 h-96 mt-10 flex flex-col justify-evenly'>
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
							<p className="text-3xl font-bold">{course.quantity} billetter</p>
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
                Fortsett med betaling
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
								onClick={() => router.back()}
								className='flex items-center justify-center h-12 w-28 mb-4 font-bold'
								aria-hidden='true'>
								<ArrowLeft className='mr-2' />
								Tilbake
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
