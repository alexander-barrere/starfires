const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { birthDate, birthTime, birthLatitude, birthLongitude } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.birthDate = birthDate;
    user.birthTime = birthTime;
    user.birthLatitude = birthLatitude;
    user.birthLongitude = birthLongitude;
    // Add additional fields to update
    user.isSubscriber = req.body.isSubscriber !== undefined ? req.body.isSubscriber : user.isSubscriber;
    user.role = req.body.role || user.role;
    
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude the password from the result
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

exports.getAstrologyChart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const svgChart = ""; // TODO: Implement actual logic to generate SVG chart based on user's profile

    res.set('Content-Type', 'image/svg+xml');
    res.send(svgChart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
