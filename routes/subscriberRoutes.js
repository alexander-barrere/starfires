const express = require('express');
const router = express.Router();
const hasRole = require('../middleware/roleAuth');

// INPUT_REQUIRED {Assuming there's a controller function to access subscriber content}
// Include subscriber-specific routes that require 'subscriber' role to access
router.get('/exclusive-content', hasRole(['subscriber']), (req, res) => {
  res.json({ message: 'This is exclusive content for subscribers.' });
});

module.exports = router;