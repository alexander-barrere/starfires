const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/profile', passport.authenticate('jwt', { session: false }), userProfileController.updateProfile);
router.post('/login', userController.login);

router.get('/profile', passport.authenticate('jwt', { session: false }), userProfileController.getUserProfile);
router.get('/profile/astrology-chart', passport.authenticate('jwt', { session: false }), userProfileController.getAstrologyChart);


module.exports = router;
