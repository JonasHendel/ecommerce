import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
		},
		course: {
      type: mongoose.Types.ObjectId,
      ref: 'course',
    },
		total: Number,
		sessionId: {
      type: String,
      unique: true,
    },
	},
	{
		timestamps: true,
	}
);


let Dataset = mongoose.model.ticket || mongoose.model('ticket', ticketSchema)

export default Dataset