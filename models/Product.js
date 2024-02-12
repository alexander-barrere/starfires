const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // ... Other fields
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // ... Other fields
});

module.exports = mongoose.model('Product', ProductSchema);
