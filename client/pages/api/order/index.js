import Courses from '../../../models/courseModel';
import Orders from '../../../models/orderModel';
import dbConnect from '../../../utils/dbConnect';
import auth from '../../../middleware/auth';
const stripe = require('stripe')(process.env.STRIPE_SK);

dbConnect();

export default async (req, res) => {
	switch (req.method) {
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
