const express = require('express');
const router = express.Router();
const astrologyController = require('../controllers/astrologyController');

router.post('/astrology-charts', astrologyController.getAstrologyChart);

module.exports = router;
