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
  firstName: { // New field for first name
    type: String,
    required: true // Set to true if you require the first name on registration
  },
  lastName: { // New field for last name
    type: String,
    required: true // Set to true if you require the last name on registration
  },
  birthDate: {
    type: Date,
    required: false
  },
  birthTime: {
    type: String,
    required: false
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere' // Create a geospatial index
    }
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
