const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		images: {
			type: Array,
		},
		price: {
			type: Number,
			required: true,
		},
		spots: {
			type: Number,
			required: true,
		},
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true,
    },
		sold: {
      type: Number,
			default: 0,
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

let Dataset = mongoose.models.course || mongoose.model('course', courseSchema);

export default Dataset;
