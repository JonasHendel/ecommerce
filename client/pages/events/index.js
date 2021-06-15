import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Event from '../../components/Event';
import { DataContext } from '../../store/GlobalState';
import Head from 'next/head';

import { getData } from '../../utils/fetchData';

const eventOverview = (props) => {
	const [events, setEvents] = useState(props.events);

	useEffect(() => {
		setEvents(props.events);
	}, [props.events]);

	return (
		<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
			<Head>
				<title>Arrangementer</title>
			</Head>
			<div className='flex flex-wrap justify-center sm:justify-start'>
				{events.length === 0 ? (
					<div className='flex justify-center w-full'>
						<h1 className='mt-20 text-2xl font-bold'>
							Ingen arrangementer tilgjengelig
						</h1>
					</div>
				) : (
					events.map((event) => (
						<Event key={event._id} event={event} />
					))
				)}
			</div>
		</div>
	);
};

export default eventOverview;

export async function getServerSideProps() {
	const res = await getData('event');
	return {
		props: {
			events: res.events,
			result: res.result,
		},
	};
}
