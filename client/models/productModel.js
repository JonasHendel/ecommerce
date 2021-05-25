import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 90
  },
  content: {
    type: String,
    required: true,
    maxLength: 320
  },
  images: {
    type: Array,
    required: true
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