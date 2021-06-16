const Ticket = ({ ticket }) => {
	const { user, course } = ticket;

	return (
		<>
			<div className='flex flex-col w-500 h-60 justify-evenly shadow-even my-10 p-10'>
				<div className='flex justify-between'>
					<p className="uppercase font-bold text-xl">{course.title}</p>
					<p>{course.date} {course.time}</p>
				</div>
				<div className='flex justify-between'>
					<p>Name: {user.name}</p>
					<p>Email: {user.email}</p>
				</div>
				<div className='flex justify-center'>
					<p className="font-bold text-xl">{ticket._id}</p>
				</div>
				<div className='flex justify-between'>
					<p>Total: {ticket.total/100}NOK</p>
					<p>Quantity: {ticket.quantity}</p>
				</div>
			</div>
		</>
	);
};

export default Ticket;
