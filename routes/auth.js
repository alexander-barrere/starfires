const express = require('express');
const { check, validationResult } = require('express-validator');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], UserController.register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], UserController.login);

module.exports = router;
