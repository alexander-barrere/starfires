const connectDB = require('./config/db');
const User = require('./models/User');

// Function to update user latitude
const updateLatitudeByEmail = async (email, newLatitude) => {
  connectDB();

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log('User not found!');
      return;
    }

    // Update the latitude
    user.latitude = parseFloat(newLatitude).toFixed(7); // Correct latitude precision to 7 decimal places
    await user.save();
    console.log(`Updated user latitude for ${user.email}`);
  } catch (error) {
    console.error('Error updating user latitude:', error);
  }

  process.exit();
};

// Replace with the correct latitude value
const newLatitude = '0.0000000'; // INPUT_REQUIRED {Replace with the correct latitude value}
updateLatitudeByEmail('testuser3@example.com', newLatitude);
