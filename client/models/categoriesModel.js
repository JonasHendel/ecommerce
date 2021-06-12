import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
      unique: true,
      trim: true,
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

let Dataset = mongoose.models.categories || mongoose.model('categories', categoriesSchema);

export default Dataset;
