const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title'],
	},
	description: {
		type: String,
		required: [true, 'Please add a description'],
	},
	image: String,
});

module.export = mongoose.model.Event || mongoose.model('Event', EventSchema);
