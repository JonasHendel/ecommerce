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

	const [tab, setTab] = useState(0);
	const [event, setEvent] = useState(initialState);


	const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-4 border-black ';
		return 'h-12 mr-2';
	};



	return (
		<>
			<Head>
				<title>{event.title}</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex justify-evenly mt-20 items-center w-full h-4/5 shadow-even rounded-2xl'>
					<section className='flex flex-col h-4/5 w-2/5 justify-center'>
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
