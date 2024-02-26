const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const geocode = require('../utils/geocode');

// Helper function for error handling
const handleServerError = (err, res) => {
    console.error(err);
    res.status(500).send('Server Error');
};

console.log('UserController file is running.');

exports.register = async (req, res) => {
    console.log('Register function is called.');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, name, birthDate, birthTime, city, state, country } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

        const { latitude, longitude } = await geocode(city, state, country);
        user = new User({
            name, username, email, password,
            birthDate: birthDate ? new Date(birthDate) : null,
            birthTime, city, state, country,
            location: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) { handleServerError(err, res); }
};

exports.login = async (req, res) => {
    console.log('Login function is called.');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) { handleServerError(err, res); }
};

exports.adminLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // Check if user exists and has the admin role
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        if (user.role !== 'admin') { // Assuming 'role' is the field for user roles and 'admin' is the value for administrators
            return res.status(401).json({ errors: [{ msg: 'Unauthorized, admin access only' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = {
            user: {
                id: user.id,
                role: user.role // Including role in the token can be useful
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAstrologyChart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Example: Generate or retrieve the astrology chart based on user data
        // This is where you'd integrate with your astrology chart generation logic
        // For demonstration, I'll just return a placeholder response
        const astrologyChartData = {
            user: user.name,
            chart: "Placeholder for user's astrology chart data",
            message: "Astrology chart generated successfully."
        };

        res.json(astrologyChartData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.updateProfile = async (req, res) => {
    console.log('UpdateProfile function is called.');
    try {
        const { birthDate, birthTime, birthLatitude, birthLongitude, isSubscriber, role } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        // Update fields
        user.birthDate = birthDate;
        user.birthTime = birthTime;
        user.birthLatitude = birthLatitude;
        user.birthLongitude = birthLongitude;
        user.isSubscriber = isSubscriber !== undefined ? isSubscriber : user.isSubscriber;
        user.role = role || user.role;
        await user.save();
        res.json(user);
    } catch (err) { handleServerError(err, res); }
};

exports.getUserProfile = async (req, res) => {
    console.log('Get user function is called.');
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) { handleServerError(err, res); }
};

console.log('Register function:', exports.register);
console.log('Login function:', exports.login);
console.log('UpdateProfile function:', exports.updateProfile);
console.log('GetUserProfile function:', exports.getUserProfile);
