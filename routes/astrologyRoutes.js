const express = require('express');
const router = express.Router();
const { generateAstrologicalReport } = require('../controllers/astrologyController');
const passport = require('passport');

router.post('/generate-report', passport.authenticate('jwt', { session: false }), generateAstrologicalReport);

module.exports = router;
