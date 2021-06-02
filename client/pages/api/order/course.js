import Tickets from '../../../models/ticketModel';
import Courses from '../../../models/courseModel';
import dbConnect from '../../../utils/dbConnect';
import auth from '../../../middleware/auth';
const stripe = require('stripe')(process.env.STRIPE_SK);

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await createTicket(req, res);
			break;
		case 'GET':
			await getTickets(req, res);
			break;
	}
};

const createTicket = async (req, res) => {
	try {
		const result = await auth(req, res);
		const { query, course } = req.body;

		const { session_id } = query;

		const session = await stripe.checkout.sessions.retrieve(session_id);

		const newTicket = new Tickets({
			user: result.id,
			course: course._id,
			quantity: course.quantity,
			total: session.amount_total,
			sessionId: session_id,
		});

		await newTicket.save();

		if (Object.keys(session).length) {
			sold(course._id, course.quantity, course.spots, course.sold);
		}
		return res.status(200).json({ session_id, newTicket });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const sold = async (id, quantity, oldInStock, oldSold) => {
	await Courses.findOneAndUpdate(
		{ _id: id },
		{
			spots: oldInStock - quantity,
			sold: quantity + oldSold,
		}
	);
};

const getTickets = async (req, res) => {
	try {
		const result = await auth(req, res);

		let tickets;

		if (result.role !== 'admin') {
			tickets = await Tickets.find({ user: result.id })
				.populate('user', '-password')
				.populate('course');
		} else {
			tickets = await Tickets.find()
				.populate('user', '-password')
				.populate('course');
		}
		res.json({ tickets });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
