const stripe = require('stripe')(process.env.STRIPE_SK);

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await createCheckoutSession(req, res);
			break;
	}
};

const createCheckoutSession = async (req, res) => {
	try {
		const { cart, user } = req.body;

		const session = await stripe.checkout.sessions.create({
			customer_email: user.email,
      shipping_rates: ['shr_1Iqgi1GKeCgkx3sKt4ZSTYyq'],
      shipping_address_collection: {
        allowed_countries: ['NO'],
      },
			payment_method_types: ['card'],
			line_items: cart.map((item) => {
				return {
					price_data: {
						currency: 'nok',
						product_data: {
							name: item.title,
							metadata: {
								id: item._id,
							},
						},
						unit_amount: item.price * 100,
					},
					quantity: item.quantity,
				};
			}),
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success/cart?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
		});

		res.json({ id: session.id });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
