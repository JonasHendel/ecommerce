import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
		},
		address: Object,
		mobile: String,
		cart: Array,
		total: Number,
		sessionId: {
			type: String,
			unique: true,
		},
		delivered: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema);

export default Dataset;
