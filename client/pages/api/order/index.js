import Products from '../../../models/productModel';
import Orders from '../../../models/orderModel';
import dbConnect from '../../../utils/dbConnect';
const stripe = require('stripe')(
  process.env.STRIPE_SK
);

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await createOrder(req, res);
			break;
	}
};

const createOrder = async (req, res) => {
	try {

		const { query, cart } = req.body;

		const { session_id } = query;

		const session = await stripe.checkout.sessions.retrieve(session_id);

    const items = await stripe.checkout.sessions.listLineItems(session_id)

    console.log(session, items)

		if (Object.keys(session).length) {
			cart.map((item) => {
				return sold(item._id, item.quantity, item.inStock, item.sold);
			});
		}

		return res.status(200).json({ session_id });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const sold = async (id, quantity, oldInStock, oldSold) => {
	console.log(id, quantity, oldInStock, oldSold);
	await Products.findOneAndUpdate(
		{ _id: id },
		{
			inStock: oldInStock - quantity,
			sold: quantity + oldSold,
		}
	);
};