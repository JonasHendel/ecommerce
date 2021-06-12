const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
		checked: {
			type: Boolean,
			default: false,
		},
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);