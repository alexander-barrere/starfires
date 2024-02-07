module.exports = (io, socket) => {
    socket.on('join-stream', (room) => {
        socket.join(room);
    });

    // INPUT_REQUIRED {Enhance the mechanism to broadcast/emit streams using appropriate WebRTC or similar streaming technology}

    socket.on('stream', (data) => {
        // Broadcasting to other clients in the 'room', except the sender
        socket.to(data.room).emit('stream', data.stream);
        // Be aware that raw media streams cannot be directly transmitted via Socket.IO
        // You'll need to implement streaming through a service or WebRTC data channels
    });
}
