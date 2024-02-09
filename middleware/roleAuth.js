const passport = require('passport');
const User = require('../models/User');

// Middleware to check if the user has the required role
const hasRole = (roles) => [
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (roles.includes(user.role)) {
        return next();
      } else {
        // If user role is not in roles array, access is denied
        return res.status(403).json({ message: 'Access denied. Insufficient role' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
];

module.exports = hasRole;