const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: false
  },
  birthTime: {
    type: String,
    required: false
  },
  birthLatitude: {
    type: Number,
    required: false
  },
  birthLongitude: {
    type: Number,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date
  },
  // Additional fields based on new requirement
  isSubscriber: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'subscriber'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);
