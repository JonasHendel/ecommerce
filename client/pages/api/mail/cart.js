const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

export default async (req, res) => {
  switch(req.method){
    case 'POST':
      await sendMail(req, res)
      break;
  }
}

const sendMail = async (req, res) => {
	try {
		const { email } = req.body.user;

		const { order } = req.body;

		const msg = {
			to: email,
			from: 'devhendel@gmail.com',
			templateId: 'd-5b987a342cc44cef9d3e82dde98f8845',
			dynamicTemplateData: {
				"title": 'Francesco Solimeo Pizzachef bestilling',
				"total": order.total/100,
				"id": order._id 
			},
		};

		sgMail.send(msg);
		return res.json({ msg: 'Email Sent' });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};