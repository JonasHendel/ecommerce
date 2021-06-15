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
		const tickets = await Tickets.find({ course: id })
			.populate('user', '-password')
			.populate('course');

		res.json({ tickets });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
