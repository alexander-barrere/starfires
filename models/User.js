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
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guest', 'subscriber'], // Added 'guest' and 'subscriber' to the roles enum
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);
