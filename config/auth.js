const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.user.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(jwtStrategy);
};
