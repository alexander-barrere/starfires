const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  // ... Other fields
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // ... Other fields
});

module.exports = mongoose.model('Course', CourseSchema);
