const User = require('../models/User');
const updateUserRole = require('../middleware/updateUserRole');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Import Stripe and configure with your secret key

exports.handleSubscription = async (req, res) => {
  const { stripeToken, userEmail } = req.body; // Assume these are passed from the frontend

  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: userEmail,
      source: stripeToken, // Token generated on the frontend
    });

    // Create a subscription for the customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'your-plan-id' }], // Replace 'your-plan-id' with your actual plan ID from Stripe
    });

    // Assuming the subscription is successful, update the user role in your DB
    const user = await User.findOne({ email: userEmail });
    if (user) {
      user.role = 'subscriber';
      await user.save();
      // Optionally, save subscription details to the user model for future reference
    }

    // Return a success response
    res.status(200).json({ message: 'Subscription successful, user role updated to subscriber.' });
  } catch (error) {
    console.error('Subscription failed:', error);
    res.status(400).json({ message: 'Subscription failed', error: error.message });
  }
};
