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
		const { course, user } = req.body;

		const session = await stripe.checkout.sessions.create({
			customer_email: user.email,
			payment_method_types: ['card'],
      line_items:  [
        {
        price_data: {
          currency: 'nok',
          product_data: {
            name: course.title.toUpperCase(),
            metadata: {
              id: course._id,
            },
          },
          unit_amount: course.price * 100,
        },
        quantity: course.quantity,
      }
    ],
			mode: 'payment',
			success_url: `${process.env.BASE_URL}/success/course?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.BASE_URL}/course/${course._id}`,
		});

		res.json({ id: session.id });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
