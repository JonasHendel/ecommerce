import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title.'],
    trim: true,
    maxLength: [50, 'Title can not be longer than 50 characters.']
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter a description.'],
    maxLength: [90, 'Description can not be longer than 90 characters.']
  },
  content: {
    type: String,
    required: [true, 'Please enter content.'],
    maxLength: [320, 'Content can not be longer than 320 characters.']
  },
  images: {
    type: Array,
    required: [true, 'Please add images.'],
  },
  category: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)

export default Dataset