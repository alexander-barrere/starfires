const User = require('../models/User');

const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && !user.isSubscriber) {
      user.role = 'subscriber';
      user.isSubscriber = true;
      await user.save();
    }
    next();
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send('Server error');
  }
};

module.exports = updateUserRole;
