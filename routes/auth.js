const express = require('express');
const { check, validationResult } = require('express-validator');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('birthDate', 'Birth date is required').not().isEmpty(), 
  check('birthTime', 'Birth time is required').not().isEmpty(),
  check('birthLatitude', 'Birth latitude is required and must be a number').isFloat({ min: -90, max: 90 }),
  check('birthLongitude', 'Birth longitude is required and must be a number').isFloat({ min: -180, max: 180 })
], UserController.register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], UserController.login);

router.post('/admin/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], UserController.adminLogin);

module.exports = router;
