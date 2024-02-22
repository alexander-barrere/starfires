const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
// Assuming you've created a geocode utility
const geocode = require('../utils/geocode');

exports.register = async (req, res) => {
  console.log('Starting user registration process...'); // Initial log
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array()); // Log validation errors
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { username, email, password, name, birthDate, birthTime, city, state, country } = req.body;
  console.log('Received registration data:', { username, email, name, birthDate, birthTime, city, state, country }); // Log received data
  
  try {
    console.log(`Checking if user already exists for email: ${email}`);
    let user = await User.findOne({ email });
    if (user) {
      console.log(`User already exists for email: ${email}`);
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    console.log(`Performing geocoding for ${city}, ${state}, ${country}`);
    // Perform geocoding to get latitude and longitude
    const { latitude, longitude } = await geocode(city, state, country);
    console.log(`Geocoding results - Latitude: ${latitude}, Longitude: ${longitude}`);

    user = new User({
      name,
      username,
      email,
      password,
      birthDate: birthDate ? new Date(birthDate) : null,
      birthTime,
      city,
      state,
      country,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log(`Saving new user: ${username}`);
    await user.save();
    console.log(`User ${username} saved successfully`);

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if(err) {
          console.error('Error signing JWT token:', err);
          throw err;
        }
        console.log(`JWT token generated for user: ${username}`);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in user registration process:', err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }

    if (user.role === 'admin') {
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
