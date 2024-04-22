const express = require('express');
const { check } = require('express-validator');
const UserController = require('../controllers/userController');
const router = express.Router();

// Updated the registration route validation to check for 'username' instead of 'name'
router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
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
