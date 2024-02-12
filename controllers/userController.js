const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, birthDate, birthTime, birthLatitude, birthLongitude } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const birthDateObject = birthDate ? new Date(birthDate) : null;

    user = new User({
      username,
      email,
      password,
      birthDate: birthDateObject,
      birthTime,
      birthLatitude: parseFloat(birthLatitude),
      birthLongitude: parseFloat(birthLongitude)
    });

    user.isSubscriber = false;
    user.role = 'user';

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
        if(err) throw err;
        res.json({ token });
      }
    );
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

