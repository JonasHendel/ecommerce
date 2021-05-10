import Products from '../../../models/productModel';
import dbConnect from '../../../utils/dbConnect';
const stripe = require('stripe')(
	'sk_test_51ImgVcGKeCgkx3sKVqN4nQYj7Zgx7HqGcruRhqIoddTNBMV81OTeDsdayNlfgDit9dndGI1tpgQsQeLYz4mXlfiC00X2I8ybtR'
);

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await decreaseInStock(req, res);
			break;
	}
};

const decreaseInStock = async (req, res) => {
	try {
		const {session_id} = req.body;

    console.log(session_id)

    const session = await stripe.checkout.sessions.retrieve(
     session_id
    );
    console.log(session)

		return res.status(200).json({session_id});
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
