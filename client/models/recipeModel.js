const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  equipment: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  servings: {
    type: Number
  },
  time: {
    type: String,
  },
})

let Dataset = mongoose.models.recipe || mongoose.model('recipe', recipeSchema)

export default Dataset