import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../../../store/GlobalState';
import { ArrowLeft } from 'phosphor-react';

import Ticket from '../../../../components/Ticket';

const TicketPage = () => {
	const router = useRouter();

	const [ticket, setTicket] = useState();

	const { state } = useContext(DataContext);
	const { id } = router.query;

	const { tickets, auth } = state;

	useEffect(() => {
		if (tickets.length > 0) {
			const ticketArr = tickets.filter((ticket) => ticket._id === id);
			setTicket(ticketArr[0]);
		}
	}, [tickets]);

  if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}
  
  console.log(ticket)

	return (
		<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center'>
    <div className='w-full'>

			<button
								onClick={() => router.back()}
								className='flex items-center justify-center h-12 w-28 mb-4 font-bold'
								aria-hidden='true'>
								<ArrowLeft className='mr-2' />
								Return
							</button>
    </div>
			{/* <div>{ticket !== undefined && <Ticket ticket={ticket} />}</div> */}
		</div>
	);
};

export default TicketPage;
