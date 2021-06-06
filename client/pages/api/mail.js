const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

import auth from '../../middleware/auth';

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			await sendMail(req, res);
			break;
	}
};

const sendMail = async (req, res) => {
	try {
		const result = await auth(req, res);

		const { email } = req.body.user;

		const { course } = req.body;

    const {ticket} = req.body

		console.log(req.body);

		const msg = {
			to: email,
			from: 'devhendel@gmail.com',
			subject: course.title,
			html: `<p>Du har bestillt <strong>${course.quantity}<strong> billetter for kurset: <strong>${course.title}<strong>. Vennligst vær forberedt på å vise koden nedenfor for å bekrefte at du har billett til kurset.<p><strong>${ticket._id}</strong>`,
		};

		sgMail.send(msg);
		return res.json({ msg: 'Email Sent' });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
