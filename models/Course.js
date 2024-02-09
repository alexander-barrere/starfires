const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: [{
      moduleTitle: {
        type: String,
        required: true
      },
      lessons: [{
          lessonTitle: {
            type: String,
            required: true
          },
          material: {
            type: String
          }
        }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
