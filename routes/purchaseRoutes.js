const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const passport = require('passport');

router.post('/buy-product', passport.authenticate('jwt', { session: false }), purchaseController.handleProductPurchase);
// Add more routes for other purchase types...

module.exports = router;
