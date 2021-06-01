import Courses from '../../../models/courseModel';
import Orders from '../../../models/orderModel';
import dbConnect from '../../../utils/dbConnect';
import auth from '../../../middleware/auth';
const stripe = require('stripe')(process.env.STRIPE_SK);

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await createOrder(req, res);
			break;
		case 'GET':
			await getOrders(req, res);
			break;
	}
};

const getOrders = async (req, res) => {
	try {
		const result = await auth(req, res);

		let orders;

		if (result.role !== 'admin') {
			orders = await Orders.find({ user: result.id }).populate(
				'user',
				'-password'
			);
		} else {
			orders = await Orders.find().populate('user', '-password');
		}
		res.json({ orders });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const createOrder = async (req, res) => {

  console.log(req.body)

	try {
		// const result = await auth(req, res);
		const { query, course } = req.body;

		const { session_id } = query;

		const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log(course)

		if (course.length > 0) {
			const newOrder = new Orders({
				user: result.id,
				address: session.shipping.address,
				total: session.amount_total,
				course,
				sessionId: session_id,
			});

			await newOrder.save();
		}
		if (Object.keys(session).length) {
			return sold(
				course._id,
				course.quantity,
				course.spots,
				course.sold
			);
		}

		return res.status(200).json({ session_id, newOrder });
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
