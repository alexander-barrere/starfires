const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const passport = require('passport');

// ... Other route declarations

router.get('/profile/astrology-chart', passport.authenticate('jwt', { session: false }), userProfileController.getAstrologyChart);

router.post('/profile', passport.authenticate('jwt', { session: false }), userProfileController.updateProfile);

// ... Other route declarations

module.exports = router;
