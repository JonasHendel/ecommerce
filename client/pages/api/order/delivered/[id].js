import Orders from '../../../../models/orderModel';
import dbConnect from '../../../../utils/dbConnect';
import auth from '../../../../middleware/auth'
dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'PATCH':
			await deliveredOrder(req, res);
			break;
	}
};

const deliveredOrder = async (req, res) => {
	try {
		const result = await auth(req, res);

		if (result.role !== 'admin') {
			return res.status(400).json({ err: 'Authentication is not valid' });
		}

		const { id } = req.query;
		const order = await Orders.findOne({ _id: id });


		if (order) {
			await Orders.findOneAndUpdate(
				{ _id: id },
				{
					delivered: true,
				}
			);
			res.json({
				msg: 'Success! Order was updated.',
				result: { delivered: true },
			});
		}
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
