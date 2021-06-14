const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await sendMail(req, res);
			break;
	}
};

const sendMail = async (req, res) => {
	try {
		const { email } = req.body.user;

		const { course } = req.body;

		const msg = {
			to: email,
			from: 'devhendel@gmail.com',
			templateId: 'd-cd56f6aac03e43a6934d1bddd87719b5',
			dynamicTemplateData: {
				"title": course.title,
				"quantity": course.quantity,
				"date": course.date,
				"time": course.time,
				"id": course._id,
			},
		};

		sgMail.send(msg);
		return res.json({ msg: 'Email Sent' });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
