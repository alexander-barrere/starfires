// External modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const passport = require('passport');

// Local imports
const connectDB = require('./config/db');
const logRequestBody = require('./middleware/logRequestBody');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const astrologyRoutes = require('./routes/astrologyRoutes');
const userRoutes = require('./routes/userRoutes'); // Only one import needed
const blogRoutes = require('./routes/blogRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

require('dotenv').config();
console.log(process.env);

// Database connection
connectDB();

// Express application setup
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(logRequestBody);
require('./config/auth')(passport); // Passport config
app.use(passport.initialize());

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/astrology-charts', astrologyRoutes);
app.use('/api/users', userRoutes); // Correct base URL for user-related routes
app.use('/api/posts', blogRoutes);
app.use('/api/subscribe', subscriptionRoutes);

// Health check route
app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));

// Socket.IO setup
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST']
    }
});
require('./sockets')(io); // Setup for socket event listeners

// Server listening
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
