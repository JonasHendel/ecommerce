const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
  about: {
    type: String
  },
  event: {
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  course1: {
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  course2: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    courseContent: {
      type: String
    }
  }
})

let Dataset = mongoose.models.content || mongoose.model('content', contentSchema)

export default Dataset