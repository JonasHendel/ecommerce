import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { ArrowLeft } from 'phosphor-react';

import { DataContext } from '../../../store/GlobalState';
import { useRouter } from 'next/router';
import Ticket from '../../../components/Ticket';

const OrderDetails = () => {
	const { state, dispatch } = useContext(DataContext);
	const { tickets, auth } = state;
	const router = useRouter();
	const [ticketDetail, setTicketDetail] = useState([]);

	useEffect(() => {
		const newArr = tickets.filter(
			(ticket) => ticket._id === router.query.id
		);
		setTicketDetail(newArr);
	}, [tickets]);

	if (ticketDetail.length > 0) {
		console.log(ticketDetail);
	}

	return (
		<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
			<Head>
				<title>Bestillingsdetaljer</title>
			</Head>
			<main className=''>
				<button
					onClick={() => router.back()}
					className='flex items-center justify-center h-12 w-28 mb-4 font-bold'
					aria-hidden='true'>
					<ArrowLeft className='mr-2' />
					Tilbake
				</button>
				<div className='flex justify-center'>
					{ticketDetail.length > 0 &&
						ticketDetail.map((ticket) => (
							<Ticket ticket={ticket} />
						))}
				</div>
			</main>
		</div>
	);
};

export default OrderDetails;
