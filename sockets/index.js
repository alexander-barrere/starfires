const streamSocket = require('./streamSocket');

module.exports = (io) => {
  io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);

      // Attach event handlers:
      streamSocket(io, socket);

      socket.on('disconnect', () => {
          console.log(`Client disconnected: ${socket.id}`);
      });
  });
}
