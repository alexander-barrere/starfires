const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// Keep only user profile management routes here
router.post('/profile', passport.authenticate('jwt', { session: false }), userController.updateProfile);
router.post('/register', userController.register);
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.getUserProfile);
router.get('/profile/astrology-chart', passport.authenticate('jwt', { session: false }), userController.getAstrologyChart);

module.exports = router;
