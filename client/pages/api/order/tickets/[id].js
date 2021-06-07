import Tickets from '../../../../models/ticketModel';
import auth from '../../../../middleware/auth';

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			getTickets(req, res);
			break;
	}
};

const getTickets = async (req, res) => {
	const { id } = req.query;
	try {
		// const result = await auth(req, res)

		// console.log(result)

		// if(result.role !== 'admin'){
		//   return res.status(400).json({err: 'Authentication is invalid!'})
		// }

		const tickets = await Tickets.find({ course: id })
			.populate('user', '-password')
			.populate('course');

		res.json({ tickets });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
