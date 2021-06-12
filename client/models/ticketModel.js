const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
      required: true
		},
		course: {
			type: mongoose.Types.ObjectId,
			ref: 'course',
      required: true
		},
    quantity: {
      type: Number,
      required: true
    },
		total: {
      type: Number,
      required: true
    },
		sessionId: {
			type: String,
			unique: true,
      required: true,
		},
		checked: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

let Dataset = mongoose.models.ticket || mongoose.model('ticket', ticketSchema);

export default Dataset;
