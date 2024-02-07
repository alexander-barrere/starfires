const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const User = require('./models/User');
const passport = require('passport');

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
require('./config/auth')(passport);
app.use(passport.initialize());
const authRoutes = require('./routes/auth');
app.use('/api/users', authRoutes);

// Include setup function for socket event listeners
require('./sockets')(io);

const PORT = process.env.PORT || 3001;

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

server.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
