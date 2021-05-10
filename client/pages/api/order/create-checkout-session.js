const stripe = require('stripe')(
	'sk_test_51ImgVcGKeCgkx3sKVqN4nQYj7Zgx7HqGcruRhqIoddTNBMV81OTeDsdayNlfgDit9dndGI1tpgQsQeLYz4mXlfiC00X2I8ybtR'
);

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await createCheckoutSession(req, res);
			break;
	}
};

const createCheckoutSession = async (req, res) => {
	try {
		const cart = req.body;
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: 
				cart.map((item) => {
					return {
						price_data: {
							currency: 'nok',
							product_data: {
								name: item.title,
							},
							unit_amount: item.price * 100,
						},
						quantity: item.quantity,
					};
				}),
			mode: 'payment',
			success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.BASE_URL}/cart`,
		});

		res.json({ id: session.id });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
