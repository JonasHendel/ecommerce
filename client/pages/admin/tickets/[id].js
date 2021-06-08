import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../../utils/fetchData';
import Head from 'next/head'

import Ticket from '../../../components/Ticket';

const Tickets = () => {
	const router = useRouter();

	const { id } = router.query;
	const [tickets, setTickets] = useState([]);

	useEffect(async () => {
		if (id !== undefined) {
			await getData(`order/tickets/${id}`).then((res) => {
				setTickets(res.tickets);
			});
		}
	}, [id]);


	return (
		<>
    <Head>
    <title>Ticket Details</title>
    </Head>
			<div className="max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 flex flex-wrap justify-evenly sm:justify-start'">
				{tickets.map((ticket) => (
					<>
						<Ticket ticket={ticket} />
					</>
				))}

			</div>
		</>
	);
};

export default Tickets;
