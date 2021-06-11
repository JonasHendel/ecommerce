import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Event from '../../components/Event'
import { DataContext } from '../../store/GlobalState';
import Head from 'next/head'

import { getData } from '../../utils/fetchData';

const eventOverview = (props) => {
	const [events, setEvents] = useState(props.events);


	useEffect(() => {
		setEvents(props.events);
	}, [props.events]);



	return (
		<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
    <Head>
      <title>Events</title>
    </Head>
    <div className='flex flex-wrap justify-center sm:justify-start'>
			{events.length === 0 ? (
				<h2>No products</h2>
			) : (
				events.map((event) => (
						<Event key={event._id} event={event}/>
				))
			)}
    </div>
		</div>
	);
};

export default eventOverview;

export async function getServerSideProps() {
	const res = await getData('event');
	// console.log(res)
	return {
		props: {
			events: res.events,
			result: res.result,
		},
	};
}
