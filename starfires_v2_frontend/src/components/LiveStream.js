import React, { useEffect, useState } from 'react';
import { socket } from '../utils/socket';

const LiveStream = () => {
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const videoElement = document.querySelector('#videoStream');

        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
            setStream(localStream);
            videoElement.srcObject = localStream;

            // Join a predefined room
            const roomName = 'global-room'; // This should be dynamic based on your app's logic
            socket.emit('join-stream', roomName);

            // Setup WebRTC peer connections on joining a room
            // This is a simplified example. You'll need to handle signaling: sending/receiving offers/answers and ICE candidates
            socket.on('offer', (offer) => {
                console.log('Received offer', offer);
                // Handle the offer received from a peer
            });

            socket.on('candidate', (candidate) => {
                console.log('Received ICE candidate', candidate);
                // Handle the ICE candidate received from a peer
            });

            // More WebRTC setup for creating offers/answers, handling ICE candidates, etc.
        });

        return () => {
            // Cleanup on component unmount
            stream?.getTracks().forEach(track => track.stop());
            socket.emit('leave-stream', roomName); // Notify server on leaving
            socket.off('offer');
            socket.off('candidate');
        };
    }, [stream]);

    return (
        <div>
            <video id="videoStream" autoPlay playsInline muted></video>
            {/* Add UI controls like mute, camera off, etc. */}
        </div>
    );
};

export default LiveStream;
