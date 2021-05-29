const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
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
  images: {
    type: Array,
  },
  price: {
    type: Number,
    required: true
  },
  spots: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

let Dataset = mongoose.models.course || mongoose.model('course', courseSchema)

export default Dataset
