import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useRouter} from 'next/router'
import { loadStripe } from '@stripe/stripe-js';
import { MinusCircle, PlusCircle, ShoppingCart } from 'phosphor-react';
import { addCourse } from '../../store/Actions';
import EventForm from '../../components/EventForm'

import ImageSlider from '../../components/slider/ImageSlider'

import {DataContext} from '../../store/GlobalState'
import {postData} from '../../utils/fetchData'

const Event = (props) => {
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)

  const {auth} = state

  const {user} = auth

	const initialState = {
		...props.event,
		quantity: 1,
	};

	const [event, setEvent] = useState(initialState);

	return (
		<>
			<Head>
				<title>{event.title}</title>
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex flex-col justify-start md:justify-evenly md:mt-20 items-center w-full md:h-5/6  md:shadow-even md:flex-row rounded-2xl'>
					<section className='w-96 md:w-2/5 md:ml-20 mt-10 md:mb-20 md:h-5/6 flex flex-col justify-evenly'>
						<h1 className='uppercase font-bold text-2xl mb-10'>
							{event.title}
						</h1>
						<div className='mb-10'>
              <ImageSlider slides={event.images} />
						</div>
						<div className='w-full'>
							<p className='font-bold'>{event.description}</p>
							<p>{event.content}</p>
						</div>
					</section>
					<section >
          <EventForm event={event}/>
					</section>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`event/${id}`);

	return {
		props: { event: res.event },
	};
}

export default Event;
