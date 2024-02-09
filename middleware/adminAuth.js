const passport = require('passport');
const User = require('../models/User');

const adminAuth = [passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const user = await User.findById(req.user.id);
        
        if (user.email === adminEmail && user.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}];

module.exports = adminAuth;
