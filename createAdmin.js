const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  connectDB();

  const adminData = {
    username: 'sirius', // INPUT_REQUIRED {Choose a username for the admin user}
    email: process.env.ADMIN_EMAIL, // Make sure this is set in your .env file
    password: 'password', // INPUT_REQUIRED {Choose a secure password}
    role: 'admin'
  };

  try {
    const adminExists = await User.findOne({ email: adminData.email });

    if (adminExists) {
      console.log('An admin user already exists with the provided email.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    const adminUser = new User(adminData);
    await adminUser.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating the admin user:', error.message);
  }

  process.exit();
}

createAdminUser();