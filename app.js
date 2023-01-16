/* In this example, the app.js file requires the necessary modules, connects to the MongoDB database using the connection URL specified in the .env file, adds middlewares for body-parser, 
cors, and helmet, and initializes the winston logging library. The file also includes a global error handler function, starts the server and runs program1, program2 and program3.
Please note that you need to have the dotenv package installed and have a .env file in the root of your project with the following variable: DB_URL that contains your MongoDB connection URL. */

const program1 = require('./profile.js');
const program2 = require('./chartmaker.js');
const program3 = require('./usercreate.js');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Connect to the database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Add middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Initialize the winston logging library
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Add the winston logger to the request object
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('An unexpected error occurred');
});

// Start the server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
  program1();
  program2();
  program3();
});