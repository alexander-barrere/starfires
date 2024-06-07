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
  firstName: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  birthDateTime: {
    type: Date,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
      type: Number,
      required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date
  },
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
