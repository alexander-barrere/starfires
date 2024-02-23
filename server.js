const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const passport = require('passport');
const cors = require('cors');
const logRequestBody = require('./middleware/logRequestBody');

// Connect Database
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for routes
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(logRequestBody); // Log Request Body Middleware
require('./config/auth')(passport);
app.use(passport.initialize());
const authRoutes = require('./routes/auth');
app.use('/api/users', authRoutes);

// Include setup function for socket event listeners
require('./sockets')(io);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const astrologyRoutes = require('./routes/astrologyRoutes');
app.use('/api/astrology-charts', astrologyRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api/posts', blogRoutes);

const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/subscribe', subscriptionRoutes);

const PORT = process.env.PORT || 3001;

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

