const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB();

const checkSchema = async () => {
  const schemaPaths = User.schema.paths;

  const latitudeExists = schemaPaths.hasOwnProperty('latitude');
  const longitudeExists = schemaPaths.hasOwnProperty('longitude');

  console.log(`Latitude field exists: ${latitudeExists}`);
  console.log(`Longitude field exists: ${longitudeExists}`);

  if (latitudeExists) {
    console.log(`Latitude type is Number: ${schemaPaths.latitude.instance === 'Number'}`);
  }

  if (longitudeExists) {
    console.log(`Longitude type is Number: ${schemaPaths.longitude.instance === 'Number'}`);
  }

  // Disconnect from the database
  mongoose.disconnect();
};

checkSchema();