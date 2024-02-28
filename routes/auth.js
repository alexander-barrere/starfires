const express = require('express');
const { check } = require('express-validator');
const UserController = require('../controllers/userController');
const router = express.Router();

console.log('Auth Routes file is running.');
console.log('UserController in auth.js:', UserController);
console.log('UserController.register in auth.js:', UserController.register);
console.log('UserController.login in auth.js:', UserController.login);
console.log('UserController.adminLogin in auth.js:', UserController.adminLogin);

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
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
