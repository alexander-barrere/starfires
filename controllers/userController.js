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

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName, birthDateTime, city, state, country } = req.body;

    if (!birthDateTime) {
        return res.status(400).json({ msg: 'Birth date and time are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

        const { latitude, longitude } = await geocode(city, state, country);
        user = new User({
            firstName, lastName, username, email, password,
            birthDateTime: new Date(birthDateTime),
            city, state, country,
            location: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // User registered, now log them in by generating a token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            // Return both token and user info, minus password
            user.password = undefined; // Ensure the password is not sent back
            res.json({ token, user });
        });
    } catch (err) { handleServerError(err, res); }
};

exports.login = async (req, res) => {
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
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized, admin access only' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        handleServerError(err, res);
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

        return res.json(astrologyChartData);
    } catch (err) {
        return handleServerError(err, res);
    }
};


exports.updateProfile = async (req, res) => {
    console.log('UpdateProfile function is called.');
    try {
        const { birthDateTime, birthLatitude, birthLongitude, isSubscriber, role } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        // Update fields
        user.birthDateTime = birthDateTime;
        user.birthLatitude = birthLatitude;
        user.birthLongitude = birthLongitude;
        user.isSubscriber = isSubscriber !== undefined ? isSubscriber : user.isSubscriber;
        user.role = role || user.role;
        await user.save();
        return res.json(user);
    } catch (err) { return handleServerError(err, res); }
};

exports.getUserProfile = async (req, res) => {
    try {
        // Assuming the user ID is stored in req.user.id from the JWT payload
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Optionally remove sensitive information
        user.password = undefined;
        return res.json(user);
    } catch (err) {
        return handleServerError(err, res);
    }
};

console.log('Register function:', exports.register);
console.log('Login function:', exports.login);
console.log('UpdateProfile function:', exports.updateProfile);
console.log('GetUserProfile function:', exports.getUserProfile);
