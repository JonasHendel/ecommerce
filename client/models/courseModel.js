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
  images: {
    type: Array,
  }
})

let Dataset = mongoose.models.course || mongoose.model('course', courseSchema)

export default Dataset