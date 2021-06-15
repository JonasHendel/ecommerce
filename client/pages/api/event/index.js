import dbConnect from '../../../utils/dbConnect';
import Events from '../../../models/eventModel';
import auth from '../../../middleware/auth';

dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			await getEvents(req, res);
			break;
		case 'POST':
			await createEvent(req, res);
			break;
			a;
	}
};

const getEvents = async (req, res) => {
	try {
		const events = await Events.find({checked: false});
		res.json({
			status: 'success',
			result: events.length,
			events,
		});
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const createEvent = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const { title, description, content, images } = req.body;

		if (!title || !description || !content || images.length === 0)
			return res.status(400).json({ err: 'Please add all the fields.' });

		const event = await Events.findOne({ title });
		if (event)
			return res.status(400).json({ err: 'This event already exists' });

		const newEvent = new Events({
			title: title.toLowerCase(),
			description,
			content,
			images,
		});

		await newEvent.save();

		res.json({ msg: 'Success! Event was created' });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
