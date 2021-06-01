import Products from '../../../models/productModel';
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
	try {
		const result = await auth(req, res);
		const { query, cart } = req.body;

		const { session_id } = query;

		const session = await stripe.checkout.sessions.retrieve(session_id);


		// if (cart.length > 0) {
		const newOrder = new Orders({
			user: result.id,
			address: session.shipping.address,
			cart,
			total: session.amount_total,
			sessionId: session_id,
		});

		await newOrder.save();

		// }
		if (Object.keys(session).length) {
			cart.map((item) => {
				return sold(item._id, item.quantity, item.inStock, item.sold);
			});
		}

		return res.status(200).json({ session_id, newOrder });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const sold = async (id, quantity, oldInStock, oldSold) => {
	await Products.findOneAndUpdate(
		{ _id: id },
		{
			inStock: oldInStock - quantity,
			sold: quantity + oldSold,
		}
	);
};
