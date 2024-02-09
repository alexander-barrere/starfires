module.exports = (io, socket) => {
    // Join a room
    socket.on('join-stream', (room) => {
        socket.join(room);
        // Notify others in the room that a new peer has joined
        socket.to(room).emit('peer-joined', { peerId: socket.id, room: room });
    });

    // Handle WebRTC offers
    socket.on('offer', (data) => {
        // Send offer to the specific peer in the room
        socket.to(data.to).emit('offer', { from: socket.id, offer: data.offer });
    });

    // Handle WebRTC answers
    socket.on('answer', (data) => {
        // Send answer back to the offer sender
        socket.to(data.to).emit('answer', { from: socket.id, answer: data.answer });
    });

    // Exchange ICE candidates
    socket.on('candidate', (data) => {
        // Broadcast the ICE candidate to peers in the room
        socket.to(data.to).emit('candidate', { from: socket.id, candidate: data.candidate });
    });

    // Leave the stream
    socket.on('leave-stream', (room) => {
        socket.leave(room);
        // Notify others in the room that a peer has left
        socket.to(room).emit('peer-left', { peerId: socket.id });
    });

    // Additional logic and event handlers as needed for your application
};
