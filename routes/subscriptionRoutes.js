const express = require('express');
const { handleSubscription } = require('../controllers/subscriptionController');
const passport = require('passport');

const router = express.Router();

router.post('/subscribe', passport.authenticate('jwt', { session: false }), handleSubscription);

module.exports = router;
